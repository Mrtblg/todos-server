import logger from '../../framework/logger';
import knex from '../../framework/db-connector';

export default {
  /**
   * fetch tasks ordered and paginated
   * for a given account and a given status
   * @param {Acount} account owner of the tasks
   * @param {TaskStatus} status status of the task
   * @param {ID} offset fetch results from this offset
   * @param {Integer} limit max number of results
   * @param {Object} order the order on which to fetch results
   * @returns {[Task]}
   */
  findByAccountAndStatus: async (account, status, offset, limit, order) => {
    const whereQuery = {
      account_id: account.id
    }
    // handle the 'all' status as any status
    if (['todo', 'done'].indexOf(status) > -1) {
      whereQuery.status = status
    }
    const [orderRef, orderDir] = order;
    try {
      const tasks = await knex('task')
        .where(whereQuery)
        .orderBy(orderRef, orderDir)
        .offset(offset)
        .limit(limit)
        .select()
      return tasks
    } catch(error) {
      logger.error('Couldn\'t retive tasks', error);
      throw new Error('Couldn\'t retive tasks');
    }
  },

  /**
   * fetch a task by its ID and its account
   * @param {Acount} account owner of the task
   * @param {ID} id id of the task
   * @returns {Task}
   */
  findByAccountAndId: async (account, id) => {
    try {
      const tasks = await knex('task')
        .where({ id, account_id: account.id })
        .select()
      if (tasks.length === 0) {
        throw new Error('Tasks empty');
      }
      return tasks[0];
    } catch(error) {
      logger.error('Couldn\'t retive task', error);
      throw new Error('Couldn\'t retive task');
    }
  },

  /**
   * create a task for given user with default status
   * @param {Account} account the owner of the task
   * @param {String} title the title of the task
   * @param {String} content the content of the task
   * @returns {String} the ID of the new task
   */
  create: async (account, title, content) => {
    try {
      const tasks = await knex('task')
        .insert({ account_id: account.id, title, content })
        .returning('id')
      if (tasks.length === 0) {
        throw new Error('Couldn\'t create task');
      }
      return tasks[0];
    } catch(error) {
      logger.error('Couldn\'t create task', error);
      throw new Error('Couldn\'t create task');
    }
  },

  /**
   * update a task for given user based of task ID
   * @param {Account} account the owner of the task
   * @param {ID} id ID of the task
   * @param {String} title the title of the task
   * @param {String} content the content of the task
   * @param {TaskStatus} status the status of the task
   * @returns {Boolean} updateSuccessfull
   */
  update: async (account, id, title, content, status) => {
    try {
      const task = await knex('task')
        .where({ id, account_id: account.id })
        .update({ title, content, status })
        .returning('id')
      if (task.length === 0) {
        throw new Error('Couldn\'t modify task');
      }
      return task[0];
    } catch(error) {
      logger.error('Couldn\'t modify task', error);
      return false;
    }
  },

  /**
   * delete a task by its ID and its account
   * @param {Acount} account owner of the task
   * @param {ID} id id of the task
   * @returns {Boolean} deleteSuccessfull
   */
  del: async (account, id) => {
    try {
      const tasks = await knex('task')
        .where({ id, account_id: account.id })
        .del()
        .returning('id')
      if (tasks.length === 0) {
        throw new Error('Tasks empty');
      }
      return true;
    } catch(error) {
      logger.error('Couldn\'t delete task', error);
      return false;
    }
  },

  /**
   * changes the status of a list of tasks to done
   * @param {Acount} account owner of the tasks
   * @param {[ID]} ids ids of the tasks
   * @returns {[String]} ids of the tasks that were updated
   */
  clearByIds: async (account, ids) => {
    try {
      const tasks = await knex('task')
        .whereIn('id', ids)
        .where({ account_id: account.id })
        .update({ status: 'done' })
        .returning('id')
      return tasks;
    } catch(error) {
      logger.error('Couldn\'t clear tasks', error);
      throw new Error('Couldn\'t clear tasks');
    }
  },
}
