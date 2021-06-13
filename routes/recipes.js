const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth.js")

const recipesController = require("../controllers/recipesController.js")

router.get("/recipes", recipesController.getAllRecipes)
router.get("/recipes/:id", recipesController.getRecipe)

router.post("/recipes", auth.verifyToken, recipesController.addRecipe)

router.patch("/recipes/:id", auth.checkId, recipesController.editRecipe)
router.delete("/recipes/:id", auth.checkId, recipesController.deleteRecipe)

module.exports = router
