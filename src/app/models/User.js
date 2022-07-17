import Sequelize, { Model } from 'sequelize'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        responsible_1: Sequelize.STRING,
        email_1: Sequelize.STRING,
        kinshi_1: Sequelize.STRING,
        cpf_1: Sequelize.STRING,
        telephone_1: Sequelize.STRING,
        birthdate: Sequelize.STRING,
        responsible_2: Sequelize.STRING,
        email_2: Sequelize.STRING,
        kinshi_2: Sequelize.STRING,
        cpf_2: Sequelize.STRING,
        telephone_2: Sequelize.STRING,
        password_has: Sequelize.STRING,
        type_acess: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
  }
}

export default User
