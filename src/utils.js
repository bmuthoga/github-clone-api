const SQL = require("sequelize");

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL("database", "username", "password", {
    dialect: "sqlite",
    storage: "./store.sqlite",
    operatorsAliases,
    logging: false,
  });

  const boards = db.define("board", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: SQL.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
  });

  const statuses = db.define("status", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: SQL.STRING,
      allowNull: false,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
  });

  const categories = db.define("category", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: SQL.STRING,
      allowNull: false,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
  });

  const stories = db.define("story", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: SQL.STRING,
      allowNull: false,
      unique: true,
    },
    description: SQL.STRING,
    categoryId: {
      type: SQL.INTEGER,
      references: {
        model: categories,
        key: "id",
      },
    },
    statusId: {
      type: SQL.INTEGER,
      references: {
        model: statuses,
        key: "id",
      },
    },
    boardId: {
      type: SQL.INTEGER,
      references: {
        model: boards,
        key: "id",
      },
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
  });

  stories.belongsTo(boards, { foreignKey: "boardId" });
  stories.belongsTo(statuses, { foreignKey: "statusId" });
  stories.belongsTo(categories, { foreignKey: "categoryId" });

  return { boards, statuses, categories, stories };
};
