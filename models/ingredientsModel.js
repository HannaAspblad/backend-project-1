const db = require("../database/connection.js")
const { DataTypes, Op } = require("sequelize")

const Ingredients = db.define("Ingredients", {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

Ingredients.getIngredients = async (page, filter) => {
  let limit = 10
  let offset = (page - 1) * limit

  if (page && !filter) {
    try {
      const ingredients = await Ingredients.findAll({
        offset: offset,
        limit: limit,
      })

      return ingredients
    } catch (err) {}
  } else if (filter && !page) {
    try {
      const ingredients = await Ingredients.findAll({
        where: {
          Name: { [Op.substring]: filter },
        },
      })

      return ingredients
    } catch (err) {}
  } else if (filter && page) {
    try {
      const ingredients = await Ingredients.findAll({
        where: {
          Name: { [Op.substring]: filter },
        },
        offset: offset,
        limit: limit,
      })

      return ingredients
    } catch (err) {}
  } else {
    try {
      const ingredients = await Ingredients.findAll()

      return ingredients
    } catch (err) {}
  }
}

module.exports = Ingredients
