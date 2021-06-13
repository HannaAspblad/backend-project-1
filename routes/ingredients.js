const express = require("express")
const router = express.Router()

const ingredientsController = require("../controllers/ingredientsController.js")

router.get("/ingredients", ingredientsController.getIngredients)

module.exports = router