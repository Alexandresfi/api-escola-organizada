const express = require('express')
const routes = require('./routes')
const cors = require('cors')

require('./database')
class App {
  constructor() {
    this.app = express()

    this.middlewares()
    this.routes()
    this.app.use(cors())
  }

  middlewares() {
    this.app.use(express.json())
  }

  routes() {
    this.app.use(routes)
  }
}

module.exports = new App().app
