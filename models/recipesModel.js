const db = require("../database/connection.js")

const { DataTypes } = require("sequelize")
const User = require("./userModel")
const {IngredientList } = require("./ingredientsModel.js")


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


Recipes.getAllRecipes = async () => {
  try {
    const recipes = await RecipeDetails.findAll()

  
    //gruppera recepten till ett objekt
    //const recipes = await RecipeDetails.findAll({ group: "" })

    //lista alla ingredienser efter namn och räkna

    return recipes
  } catch (err) {}
}

// Recipes.getAllRecipes = async (page, filter) => {
//   let limit = 10
//   let offset = (page - 1) * limit

//   if (page && !filter) {
//     try {
//       const recipes = await Recipe.findAll({
//         offset: offset,
//         limit: limit,
//       })

//       return recipes
//     } catch (err) {}
//   } else if (filter && !page) {
//     try {
//       const recipes = await Recipe.findAll({
//         where: {
//           Name: { [Op.substring]: filter },
//         },
//       })

//       return recipes
//     } catch (err) {}
//   } else if (filter && page) {
//     try {
//       const recipes = await Recipe.findAll({
//         where: {
//           Name: { [Op.substring]: filter },
//         },
//         offset: offset,
//         limit: limit,
//       })

//       return recipes
//     } catch (err) {}
//   } else {
//     try {
//       const recipes = await Recipes.findAll()

//       return recipes
//     } catch (err) {}
//   }
// }

Recipes.getRecipe = async (recipeId) => {
  try {
    const recipe = await Recipes.findOne({
      where: {
        id: recipeId,
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
//byt namn på funktionen
Recipes.addRecipeInstructions = async (recipeData, list) => {
  
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

    await Recipes.update({
      Name: Name,
      Instructions: Instructions,
      where: {
        id: recipeId,
      },
    })

    ingredients.forEach(async (ingredient) => {
      await IngredientList.create({
        RecipeId: recipeId,
        IngredientId: ingredient,
      })
    })

    return updated
  } catch (err) {}

  // ingredients.forEach(async (ingredient) => {
  //   try {
  //     const edited = await RecipeDetails.update(
  //       {
  //         Name: Name,
  //         IngredientId: ingredient,
  //         Instructions: Instructions,
  //       },
  //       { where: { RecipeId: recipeId } }
  //     )

  //     return edited
  //   } catch (err) {}
  // })
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
