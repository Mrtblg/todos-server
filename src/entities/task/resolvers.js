import { combineResolvers } from 'graphql-resolvers';
import authentication from '../../framework/authentication';
const { isAuthenticatedCheck } = authentication;

export default {
  Query: {
    /**
     * Fetch tasks belonging to currentAccount with defined status
     * fetch from offset (default = 0)
     * limit number of resulst (default = 10)
     * orders results based on the ID in DESC order
     * returns the list of tasks + hasNextPage + nextOffset
    */
    tasks: combineResolvers(
      isAuthenticatedCheck,
      async (
        parent,
        { status, offset = 0, limit = 10 },
        { repository, currentAccount }
      ) => {
        const tasks = await repository.Task.findByAccountAndStatus(
          currentAccount,
          status,
          offset,
          limit + 1,
          ['id', 'DESC']
        );
        const hasNextPage = tasks.length > limit;
        const list = hasNextPage ? tasks.slice(0, -1) : tasks;
        const nextOffset = offset + tasks.length - 1
        return {
          list,
          pageInfo: {
            hasNextPage,
            nextOffset: nextOffset,
          }
        }
      }
    ),
    /** Fetch a task belonging to currentAccount by id */
    task: combineResolvers(
      isAuthenticatedCheck,
      async (parent, { id }, { repository, currentAccount }) => {
        return await repository.Task.findByAccountAndId(
          currentAccount,
          id
        );
      }
    ),
  },

  Mutation: {
    /** Create a task with status todo for currentAccount */
    createTask: combineResolvers(
      isAuthenticatedCheck,
      async (parent, { title, content }, { repository, currentAccount }) => {
      return await repository.Task.create(currentAccount, title, content);
    }
    ),

    /** Update a task for currentAccount */
    updateTask: combineResolvers(
      isAuthenticatedCheck,
      async (
        parent,
        { id, title, content, status },
        { repository, currentAccount }
      ) => {
        return await repository.Task.update(
          currentAccount,
          id,
          title,
          content,
          status
        );
      }
    ),

    /** Delete a task for currentAccount */
    deleteTask: combineResolvers(
      isAuthenticatedCheck,
      async (parent, { id }, { repository, currentAccount }) => {
        return await repository.Task.del(currentAccount, id);
      }
    ),

    /** Changes the status of given tasks to done for currentAccount */
    clearTasks: combineResolvers(
      isAuthenticatedCheck,
      async (parent, { ids }, { repository, currentAccount }) => {
        return await repository.Task.clearByIds(currentAccount, ids);
      }
    ),
  },

  Task: {
    account: async (task, args, { repository }) => {
      return await repository.Account.findById(task.account_id);
    },
  },
}