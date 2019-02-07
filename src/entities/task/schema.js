import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    tasks(status: TaskStatus, offset: Int, limit: Int): TaskList!
    task(id: ID!): Task!
  }

  extend type Mutation {
    createTask(title: String!, content: String!): ID!
    updateTask(
      id: ID!,
      title: String,
      content: String,
      status: TaskStatus
    ): Boolean!
    deleteTask(id: ID!): Boolean!
    clearTasks(ids: [ID!]!): [ID!]!
  }

  type TaskList {
    list: [Task!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    nextOffset: Int!
  }

  type Task {
    id: ID!
    title: String
    content: String
    status: TaskStatus!
    account: Account!
  }

  enum TaskStatus {
    todo
    done
    all
  }
`;
