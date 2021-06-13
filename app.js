const express = require("express")
require('dotenv').config()
const app = express()


const PORT = process.env.PORT

const logger = require("./middleware/logger.js")
const usersRoutes = require("./routes/users.js")
const recipesRoutes = require("./routes/recipes.js")
const ingredientsRoutes = require("./routes/ingredients.js")


app.use(logger)
app.use(express.json())

app.use(recipesRoutes)
app.use(usersRoutes)
app.use(ingredientsRoutes)



app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
  })
  