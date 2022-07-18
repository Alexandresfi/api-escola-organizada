import Sequelize from 'sequelize'

import Teacher from '../app/models/Teacher'
import User from '../app/models/User'

import configDatabase from '../config/database'

const models = [User, Teacher]
class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models.map((model) => model.init(this.connection))
  }
}

export default new Database()
