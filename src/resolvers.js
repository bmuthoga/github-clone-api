module.exports = {
  Query: {
    boards: async (_, __, { dataSources }) =>
      await dataSources.dataAPI.getBoards(),
    board: async (_, { id }, { dataSources }) =>
      await dataSources.dataAPI.getBoard({ id }),
    stories: async (_, { boardId }, { dataSources }) =>
      await dataSources.dataAPI.getStories({ boardId }),
    story: async (_, { id }, { dataSources }) =>
      await dataSources.dataAPI.getStory({ id }),
    categories: async (_, __, { dataSources }) =>
      await dataSources.dataAPI.getCategories(),
    statuses: async (_, __, { dataSources }) =>
      await dataSources.dataAPI.getStatuses(),
  },
  Mutation: {
    addBoard: async (_, { name }, { dataSources }) =>
      await dataSources.dataAPI.addBoard({ name }),
    addStory: async (
      _,
      { title, description, boardId, categoryId, statusId },
      { dataSources }
    ) =>
      await dataSources.dataAPI.addStory({
        title,
        description,
        boardId,
        categoryId,
        statusId,
      }),
    updateBoard: async (_, { id, name }, { dataSources }) =>
      await dataSources.dataAPI.updateBoard({ id, name }),
    updateStory: async (
      _,
      { id, title, description, categoryId, statusId },
      { dataSources }
    ) =>
      await dataSources.dataAPI.updateStory({
        id,
        title,
        description,
        categoryId,
        statusId,
      }),
    deleteStory: async (_, { id }, { dataSources }) =>
      await dataSources.dataAPI.deleteStory({ id }),
  },
};
