import logger from '../../framework/logger';
import { AuthenticationError, UserInputError } from 'apollo-server';
import service from '../../framework/crypto-tools';

export default {
  Query: {
    /** Fetch all accounts should be available only to admin */
    accounts: async (parent, args, { repository }) => {
      return await repository.Account.findAll();
    },
    /** Fetch an account by its ID should be available only to admin */
    account: async (parent, { id }, { repository }) => {
      return await repository.Account.findById(id);
    },
  },

  Mutation: {
    /**
     * check if the account has correct username and password
     * if so returns a signed token for the client to join in
     * each request
     */
    signIn: async (parent, { username, pwd }, { repository }) => {
      const account = await repository.Account.findByUsername(username);
      if (!account) {
        throw new UserInputError('account not foud');
      }
      if (account.pwd === service.hashToken(pwd)) {
        return service.signToken(account.id);
      }
      throw new AuthenticationError('Invalid password');
    },
  },

  Account: {
    tasks: async (account, args, { repository }) => {
      return await repository.Task.findByAccountAndStatus(account, 'all')
    },
  },
}