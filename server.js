// Required Modules
require('dotenv').config()
require('./models') // Connect to MongoDB
const express = require('express')
const rowdy = require('rowdy-logger')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')

// Variables
const app = express()
const PORT = process.env.PORT || 5000
const rowdyResults = rowdy.begin(app)

// Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
// Initialize passport
app.use(passport.initialize())

// Controllers
app.use('/auth', require('./controllers/authController'))
// app.use('/exampleResource', require('./controllers/usersController'))
app.use('/api-v1/users', require('./controllers/usersController'))

// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'Hello world!' })
})

// Listen!
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Server listening on port ${PORT} 🌊`)
})