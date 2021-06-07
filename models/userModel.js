const db = require("../database/connection.js")
const { DataTypes } = require("sequelize")
const bcrypt = require("bcryptjs")
const salt = 10


const User = db.define("User", {
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Username already exists",
    },
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})



User.registerUser = async (email, password) => {
  const hashed = bcrypt.hashSync(password, salt)

  try {
    const newUser = User.create({ Email: email, Password: hashed })
    return newUser
  } catch (error) {}
}

User.logIn = async (email) => {
  try {
    const user = User.findOne({
      where: {
        Email: email,
      },
    })

    return user
  } catch (err) {}
}






module.exports = User
