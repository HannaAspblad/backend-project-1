require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const SECRET_KEY = process.env.SECRET_KEY

const users = require("../models/userModel.js")

async function registerUser(req, res, next) {
  const { Email, Password } = req.body
  try {
    await users.registerUser(Email, Password)

    res.json({ message: "new user added" })
  } catch (err) {
    res.json(err)
  }
}

async function logIn(req, res) {
  const { Email, Password } = req.body

  try {
    const user = await users.logIn(Email)

    if (bcrypt.compareSync(Password, user.Password)) {
      const token = jwt.sign({ Email: user.Email, id: user.id }, SECRET_KEY)
      res.json({ token: token })
    } else {
      res.json({ message: "wrong password" })
    }
  } catch (err) {
    res.json(err)
  }
}

function getUser(req, res) {

  res.json(req.body.user)
}

module.exports = { registerUser, logIn, getUser }
