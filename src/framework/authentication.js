import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';
import service from './crypto-tools';
import repository from '../entities/repository';

export default {
  /**
   * Extracts token from request headers and fetch the corresponding account
   * @param {Object} req the apollo request
   * @returns the corresponding account
   */
  getAccountFromToken: async (req) => {
    const token = req.headers['x-token'];
    if (!token) {
      return undefined;
    }
    const id = service.verifyToken(token)
    try {
      return await repository.Account.findById(id)
    } catch (error) {
      logger.error('Couldn\'t find account', error);
      throw new Error('Couldn\'t verify user');
    }
  },

  /**
   * Create a resolver that check wether the account is authenticated
   * chain this resolver before any request requiring authentication
   * will either continue transparently or throw error and stop request
   */
  isAuthenticatedCheck: (parent, args, { currentAccount }) => {
    if (!currentAccount) {
      throw new ForbiddenError('Authentication required');
    }
    return skip;
  }
}
