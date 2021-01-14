module.exports = {
  Query: {
    boards: async (_, __, { dataSources }) =>
      await dataSources.dataAPI.getBoards(),
    board: async (_, { id }, { dataSources }) =>
      await dataSources.dataAPI.getBoard({ id }),
    stories: async (_, __, { dataSources }) =>
      await dataSources.dataAPI.getStories(),
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
    updateStory: async (
      _,
      { storyId, title, description, categoryId, statusId },
      { dataSources }
    ) =>
      await dataSources.dataAPI.updateStory({
        storyId,
        title,
        description,
        categoryId,
        statusId,
      }),
    deleteStory: async (_, { storyId }, { dataSources }) =>
      await dataSources.dataAPI.deleteStory({ storyId }),
  },
};
