const { DataSource } = require("apollo-datasource");

class DataApi extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getBoard({ id }) {
    const board = await this.store.boards.findById(id);
    return board;
  }

  async getBoards() {
    const boards = await this.store.boards.findAll();
    return boards;
  }

  async getStory({ id }) {
    const story = await this.store.stories.findById(id, {
      include: [this.store.categories, this.store.statuses, this.store.boards],
    });
    return story;
  }

  async getStories({ boardId }) {
    const stories = await this.store.stories.findAll({
      where: { boardId: boardId },
      include: [this.store.categories, this.store.statuses, this.store.boards],
    });
    return stories;
  }

  async getCategories() {
    const categories = await this.store.categories.findAll();
    return categories;
  }

  async getStatuses() {
    const statuses = await this.store.statuses.findAll();
    return statuses;
  }

  async addBoard({ name }) {
    const newBoard = await this.store.boards.findOrCreate({ where: { name } });
    return newBoard[0];
  }

  async addStory({
    title,
    description,
    boardId,
    categoryId = 1,
    statusId = 1,
  }) {
    const newStory = await this.store.stories.create({
      title,
      description,
      boardId,
      categoryId,
      statusId,
    });

    const createdStory = await this.store.stories.findById(newStory.id, {
      include: [this.store.categories, this.store.statuses, this.store.boards],
    });

    return createdStory;
  }

  async updateBoard({ id, name }) {
    const board = await this.store.boards.findById(id);

    if (!board) return null;

    board.name = name || board.name;
    await board.save();
    return board;
  }

  async updateStory({ id, title, description, categoryId, statusId }) {
    const story = await this.store.stories.findById(id, {
      include: [this.store.categories, this.store.statuses, this.store.boards],
    });

    if (!story) return null;

    story.title = title || story.title;
    story.description = description || story.description;
    story.categoryId = categoryId || story.categoryId;
    story.statusId = statusId || story.statusId;
    await story.save();
    return story;
  }

  async deleteStory({ id }) {
    const story = await this.store.stories.findById(id, {
      include: [this.store.categories, this.store.statuses, this.store.boards],
    });

    if (!story) return null;

    await story.destroy();
    return story;
  }
}

module.exports = DataApi;
