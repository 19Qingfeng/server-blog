const http = require('http')
const serverHandler = require('../app')

const port = 8000

const server = http.createServer(serverHandler)

server.listen(port)