const Ingredients = require("../models/ingredientsModel.js")

async function getIngredients(req, res) {
  let { page, filter } = req.query

  if (page == undefined || page == 0) {
    page = false
  
  }
  if (filter == undefined) {
    filter = false
  }

  try {
    const results = await Ingredients.getIngredients(page, filter)
    res.json(results)
  } catch (err) {
    res.json(err)
  }
}

module.exports = { getIngredients }
