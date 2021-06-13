const db = require("../database/connection.js")

const { DataTypes } = require("sequelize")
const User = require("./userModel")
const IngredientList = require("./IngredientListsModel")
const Ingredients = require("./ingredientsModel.js")
const { sequelize } = require("./userModel")

const Recipes = db.define("Recipes", {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  Instructions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

User.hasMany(Recipes)
Recipes.belongsTo(User)

Recipes.hasMany(IngredientList)
IngredientList.belongsTo(Recipes)

Ingredients.hasMany(IngredientList)
IngredientList.belongsTo(Ingredients)

// Recipes.getAllRecipes = async () => {
//   try {

//     let recipes = await Recipes.findAll({
//       attributes: ["Name", "Instructions"],

//       include: {
//         model: IngredientList,
//         attributes: ['IngredientId'],
//         include: { model: Ingredients, attributes:['Name'] },

//       },
//     })

//     return recipes
//   } catch (err) {}
// }

Recipes.getAllRecipes = async (page, filter) => {
  let limit = 10
  let offset = (page - 1) * limit

  if (page && !filter) {
    try {
      const recipes = await Recipes.findAll({
        offset: offset,
        limit: limit,
        attributes: ["Name", "Instructions", "id", "UserId"],

        include: {
          model: IngredientList,
          attributes: ["IngredientId"],
          include: { model: Ingredients, attributes: ["Name"] },
        },
      })

      return recipes
    } catch (err) {}
  } else if (filter && !page) {
    try {
      const recipes = await Recipes.findAll({
        where: {
          Name: filter,
        },
        offset: offset,
        limit: limit,
        attributes: ["Name", "Instructions", "id", "UserId"],

        include: {
          model: IngredientList,
          attributes: ["IngredientId"],
          include: { model: Ingredients, attributes: ["Name"] },
        },
      })

      return recipes
    } catch (err) {}
  } else if (filter && page) {
    try {
      const recipes = await Recipes.findAll({
        where: {
          Name: filter,
        },
        offset: offset,
        limit: limit,
        attributes: ["Name", "Instructions", "id", "UserId"],

        include: {
          model: IngredientList,
          attributes: ["IngredientId"],
          include: { model: Ingredients, attributes: ["Name"] },
        },
      })

      return recipes
    } catch (err) {}
  } else {
    try {
      const recipes = await Recipes.findAll({
        attributes: ["Name", "Instructions", "id", "UserId"],

        include: {
          model: IngredientList,
          attributes: ["IngredientId"],
          include: { model: Ingredients, attributes: ["Name"] },
        },
      })

      return recipes
    } catch (err) {}
  }
}

Recipes.getRecipe = async (recipeId) => {
  try {
    const recipe = await Recipes.findOne({
      where: { id: recipeId },
      attributes: ["Name", "Instructions", "id", "UserId"],

      include: {
        model: IngredientList,
        attributes: ["IngredientId"],
        include: { model: Ingredients, attributes: ["Name"] },
      },
    })

    return recipe
  } catch (err) {}
}

Recipes.addRecipe = async (data, id) => {
  const { Name, Instructions } = data

  try {
    const recipe = await Recipes.create({
      Name: Name,
      Instructions: Instructions,
      UserId: id,
    })

    const recipeId = recipe.dataValues.id
    const recipeData = { data: data, recipeId: recipeId }

    return recipeData
  } catch (err) {}
}

Recipes.addIngredients = async (recipeData, list) => {
  const recipeId = recipeData.recipeId

  list.forEach(async (ingredient) => {
    try {
      await IngredientList.create({
        RecipeId: recipeId,
        IngredientId: ingredient,
      })

      return ingredientList
    } catch (err) {}
  })
}

Recipes.editRecipe = async (recipeData, recipeId) => {
  const { Name, Instructions } = recipeData
  const ingredients = recipeData.Ingredients

  try {
    const updated = await IngredientList.destroy({
      where: {
        RecipeId: recipeId,
      },
    })

    ingredients.forEach(async (ingredient) => {
      await IngredientList.create({
        RecipeId: recipeId,
        IngredientId: ingredient,
      })
    })

    const edit = await Recipes.findOne({ where: { id: recipeId } })

    edit.Name = Name
    edit.Instructions = Instructions
    await edit.save()

    return updated
  } catch (err) {}
}

Recipes.deleteRecipe = async (recipeId) => {
  try {
    const deleted = await Recipes.destroy({
      where: {
        id: recipeId,
      },
    })

    await IngredientList.destroy({
      where: {
        RecipeId: recipeId,
      },
    })

    return deleted
  } catch (err) {}
}

Recipes.matchOwnerId = async (userId, recipeId) => {
  try {
    const match = await Recipes.findOne({
      where: {
        id: recipeId,
        UserId: userId,
      },
    })

    return match
  } catch (err) {}
}
module.exports = Recipes
