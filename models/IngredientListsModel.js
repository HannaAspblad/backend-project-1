const db = require("../database/connection.js")
const { DataTypes, Op } = require("sequelize")

const IngredientList = db.define("IngredientList", {
  RecipeId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },

  IngredientId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
})

module.exports = IngredientList
