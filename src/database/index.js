import Sequelize from 'sequelize'

import Address from '../app/models/Address'
import Student from '../app/models/Student'
import Teacher from '../app/models/Teacher'
import User from '../app/models/User'
import UserAdmin from '../app/models/UserAdmin'

import configDatabase from '../config/database'

const models = [User, Teacher, Address, Student, UserAdmin]
class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
}

export default new Database()
