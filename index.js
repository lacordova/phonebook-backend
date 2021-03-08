const http = require('http')
const config = require('./utils/config')
const app = require('./app')
const logger = require('./utils/logger')

const server = http.createServer(app)

const PORT = config.PORT
server.listen(PORT,  () => {
  logger.info(`server running on port ${PORT}`)
})