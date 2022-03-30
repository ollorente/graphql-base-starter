// @ts-check
const { gql } = require("apollo-server-express");

exports.rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

exports.rootResolvers = {
  Query: {
    _: String,
  },
  Mutation: {
    _: String,
  },
};
