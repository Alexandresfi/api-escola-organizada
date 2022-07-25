import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'

class Teacher extends Model {
  static init(sequelize) {
    super.init(
      {
        fullname: Sequelize.STRING,
        surname: Sequelize.STRING,
        gener: Sequelize.STRING,
        birthdate: Sequelize.STRING,
        telephone: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        rg: Sequelize.STRING,
        number_card: Sequelize.STRING,
        university: Sequelize.STRING,
        graduation_year: Sequelize.STRING,
        graduation_titles: Sequelize.STRING,
        school_class: Sequelize.ARRAY(Sequelize.STRING),
        school_subjects: Sequelize.ARRAY(Sequelize.STRING),
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

export default Teacher
