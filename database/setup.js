const db = require('./connection.js')
const recipes = require('../models/recipesModel.js')
const ingredients = require('../models/ingredientsModel.js')
const ingredientList = require('../models/IngredientListsModel')
const users = require('../models/userModel.js')

db.sync()





