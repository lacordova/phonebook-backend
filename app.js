const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


const url = config.MONGODB_URI

logger.info(`conecting to ${url}`)
mongoose.connect(url, { useCreateIndex:true, useFindAndModify:false, useNewUrlParser:true, useUnifiedTopology:true })
  .then(() => {
    logger.info('conected to MongoDB')
  })
  .catch(error => {
    logger.error(`error conecting to MongoDB ${error.message}`)
  })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app


