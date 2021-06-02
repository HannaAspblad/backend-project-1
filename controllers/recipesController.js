require("dotenv").config()

const Recipes = require("../models/recipesModel.js")


async function getAllRecipes(req, res) {


  let { page, filter } = req.query

  if (page == undefined || page == 0) {
    page = false
  
  }
  if (filter == undefined) {
    filter = false
  }




  try {
    const results = await Recipes.getAllRecipes(page,filter)
    res.json(results)
  } catch (err) {
    res.json(err)
  }
}

async function getRecipe(req, res) {
  const { id } = req.params

  try {
    const recipe = await Recipes.getRecipe(id)
    res.json(recipe)
  } catch (err) {
    res.json(err)
  }
}

async function addRecipe(req, res) {
  
  let userId = req.body.user.id
  let newRecipe = null

  try {
    newRecipe = await Recipes.addRecipe(req.body, userId)
    res.json({ message: "new recipe added" })
  } catch (err) {
    res.json(err)
  }
  
  addRecipeInstructions(newRecipe)
  return
}






async function addRecipeInstructions(recipeData){


  try{
    const newRecipe = await Recipes.addRecipeInstructions(recipeData)
    return newRecipe
  }catch(err){
    
  }

}

async function editRecipe(req, res) {


  const { Name } = req.body

  try {
    await Recipes.editRecipe(Name, req.params.id)
    res.json({ message: "recipe updated" })

    
  } catch (err) {
    res.json(err)
  }

}

async function deleteRecipe(req, res) {
  const { id } = req.params



  try {
    const deleted = await Recipes.deleteRecipe(id)

    if (deleted == 1) {
      res.json({ message: "recipe deleted" })
    } else {
      res.json({ message: "no recipe found" })
    }
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  getAllRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  addRecipeInstructions
}
