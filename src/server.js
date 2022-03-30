// @ts-check
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const path = require("path");
const http = require("http");

const { rootTypeDefs, rootResolvers } = require("./schema");

const server = async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(express.static(path.join(__dirname, "public")));

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

server(rootTypeDefs, rootResolvers);
