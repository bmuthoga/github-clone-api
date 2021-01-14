const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    boards: [Board]!
    board(id: ID!): Board
    stories: [Story]!
    story(id: ID!): Story
    categories: [Category]!
    statuses: [Status]!
  }

  type Mutation {
    addBoard(name: String!): Board
    addStory(
      title: String!
      description: String
      boardId: ID!
      categoryId: ID
      statusId: ID
    ): Story
    updateStory(
      storyId: ID!
      title: String
      description: String
      categoryId: ID
      statusId: ID
    ): Story
    deleteStory(storyId: ID!): Story
  }

  type Board {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String
  }

  type Story {
    id: ID!
    title: String!
    description: String
    category: Category!
    status: Status!
    board: Board!
    createdAt: String!
    updatedAt: String
  }

  type Category {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String
  }

  type Status {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String
  }
`;

module.exports = typeDefs;
