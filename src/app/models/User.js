const { Model } = require('sequelize')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        responsible_1: Sequelize.STRING,
        email: Sequelize.STRING,
        kinshi_1: Sequelize.STRING,
        cpf_1: Sequelize.STRING,
        telephone_1: Sequelize.STRING,
        birthdate: Sequelize.STRING,
        responsible_2: Sequelize.STRING,
        kinshi_2: Sequelize.STRING,
        cpf_2: Sequelize.STRING,
        telephone_2: Sequelize.STRING,
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

  static associate(models) {
    this.belongsTo(models.Address, {
      foreignKey: 'address_id',
      as: 'address',
    })
  }
}

module.exports = User
