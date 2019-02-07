import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import logger from './framework/logger';
import authentication from './framework/authentication';
import schema from './entities/schema';
import resolvers from './entities/resolvers';
import repository from './entities/repository';

// start an Express server with cors
const app = express();
app.use(cors());

// start an Apollo server with Schema and resolvers
// pass the knex connector to the context
const apollo = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => ({
    repository,
    currentAccount: await authentication.getAccountFromToken(req),
  })
});
// bind the apollo server to the express server
apollo.applyMiddleware({ app, path: '/graphql' });

// start listening on port 8000
app.listen({ port: 8000 }, () => {
  logger.info('Apollo Server on http://localhost:8000/graphql');
});
