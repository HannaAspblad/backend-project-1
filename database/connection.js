const {Sequelize} = require('sequelize')


const db = new Sequelize ({
  dialect: 'sqlite',
  storage: 'database/database.db'
})


module.exports = db



