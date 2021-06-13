const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.js")

const usersController = require("../controllers/usersController.js")

router.post("/register", usersController.registerUser)

router.post("/auth", usersController.logIn)

router.get("/me", auth.verifyToken, usersController.getUser)

module.exports = router
