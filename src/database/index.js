const dotenv = require('dotenv')
const Sequelize = require('sequelize')

const Address = require('../app/models/Address')
const Student = require('../app/models/Student')
const Teacher = require('../app/models/Teacher')
const User = require('../app/models/User')
const UserAdmin = require('../app/models/UserAdmin')

dotenv.config()

const configDatabase = require('../config/database')

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

module.exports = new Database()
