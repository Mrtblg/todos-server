import logger from '../../framework/logger';
import knex from '../../framework/db-connector';

export default {
  /**
   * fetch all accounts
   * @returns {[Account]}
   */
  findAll: async () => {
    try {
      const accounts = await knex('account').select()
      return accounts
    } catch(error) {
      logger.error('Couldn\'t retive accounts', error);
      throw new Error('Couldn\'t retive accounts');
    }
  },

  /**
   * fetch an account by its ID
   * @param {ID} id id of the account
   * @returns {Account}
   */
  findById: async (id) => {
    try {
      const accounts = await knex('account').select().where({ id })
      if (accounts.length === 0) {
        throw new Error('Accounts empty');
      }
      return accounts[0];
    } catch(error) {
      logger.error('Couldn\'t retive account', error);
      throw new Error('Couldn\'t retive account');
    }
  },

  /**
   * fetch an account by its ID
   * @param {String} username id of the account
   * @returns {Account}
   */
  findByUsername: async (username) => {
    try {
      const accounts = await knex('account').select().where({ username })
      if (accounts.length === 0) {
        return undefined;
      }
      return accounts[0];
    } catch(error) {
      logger.error('Couldn\'t retive account', error);
      throw new Error('Couldn\'t retive account');
    }
  },
}
