import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    accounts: [Account!]
    account(id: ID!): Account
  }

  extend type Mutation {
    signIn(username: String!, pwd: String!): String!
  }

  type Account {
    id: ID!
    username: String!
    tasks: [Task!]
  }
`;