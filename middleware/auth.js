const SECRET_KEY = process.env.SECRET_KEY
const jwt = require("jsonwebtoken")
const Recipes = require("../models/recipesModel")

async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "")
    if (token) {
      const user = jwt.verify(token, SECRET_KEY)
      req.body.user = user
      next()
    } else {
      res.json({ message: "unauthorized" })
    }
  } catch (err) {
    res.json(err)
  }
}

async function checkId(req, res, next) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "")
    const user = jwt.verify(token, SECRET_KEY)

    const owner = await Recipes.matchOwnerId(user.id, req.params.id)

    if (owner) {
      next()
    } else {
      res.json({ message: "unauthorized" })
    }
  } catch (err) {
    res.json(err)
  }
}

module.exports = { verifyToken, checkId }
