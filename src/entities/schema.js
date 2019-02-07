import { gql } from 'apollo-server-express';

import accountSchema from './account/schema';
import taskSchema from './task/schema';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, accountSchema, taskSchema];
