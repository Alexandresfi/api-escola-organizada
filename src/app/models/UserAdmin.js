const { Model } = require('sequelize')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

class UserAdmin extends Model {
  static init(sequelize) {
    super.init(
      {
        fullname: Sequelize.STRING,
        email: Sequelize.STRING,
        telephone: Sequelize.STRING,
        cpf: Sequelize.STRING,
        rg: Sequelize.STRING,
        gener: Sequelize.STRING,
        birthdate: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_has: Sequelize.STRING,
        type_acess: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_has = await bcrypt.hash(user.password, 15)
      }
    })
    return this
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_has)
  }
}

module.exports = UserAdmin
