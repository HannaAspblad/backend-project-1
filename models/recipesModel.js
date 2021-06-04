const db = require("../database/connection.js")

const { DataTypes } = require("sequelize")
const User = require("./userModel")
const Ingredients = require("./ingredientsModel.js")

const Recipes = db.define("Recipes", {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

const RecipeDetails = db.define("RecipeDetails", {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  Instructions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

RecipeDetails.removeAttribute("id")

Recipes.belongsTo(User)
User.hasMany(Recipes)

RecipeDetails.belongsTo(Recipes)
Recipes.hasMany(RecipeDetails)


RecipeDetails.belongsTo(Ingredients);



Recipes.getAllRecipes = async()=>{

  try{

    
    const recipes = await Recipes.findAll({ include: RecipeDetails, required: true });
    console.log(JSON.stringify(recipes));

    return recipes
  }catch(err){

  }

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
  const { Name } = data

  try {
    const recipe = await Recipes.create({
      Name: Name,
      UserId: id,
    })

    const recipeId = recipe.dataValues.id
    const recipeData = { data: data, recipeId: recipeId }

    return recipeData
  } catch (err) {}
}
Recipes.addRecipeInstructions = async (recipeData) => {
  const { Name, Instructions } = recipeData.data
  const ingredients = recipeData.data.Ingredients
  const recipeId = recipeData.recipeId

  ingredients.forEach(async (ingredient) => {
    try {
      const recipeDetails = await RecipeDetails.create({
        Name: Name,
        RecipeId: recipeId,
        IngredientId: ingredient,
        Instructions: Instructions,
      })

      return recipeDetails
    } catch (err) {}
  })
}

Recipes.editRecipe = async (recipeData, recipeId) => {
  const { Name, Instructions } = recipeData
  const ingredients = recipeData.Ingredients

  ingredients.forEach(async (ingredient) => {
    try {
      const edited = await RecipeDetails.update(
        {
          Name: Name,
          IngredientId: ingredient,
          Instructions: Instructions,
          
        },
        { where: { RecipeId: recipeId } }
      )

      return edited
    } catch (err) {}
  })
}

Recipes.deleteRecipe = async (recipeId) => {
  try {
    
    const deleted = await Recipes.destroy({
     
      where: {
        id: recipeId,
      }
    }).then(await RecipeDetails.destroy({where:{
      recipeId: null
    }}))

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
;(module.exports = Recipes), RecipeDetails
