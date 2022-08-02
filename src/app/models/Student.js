const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        year: Sequelize.INTEGER,
        school_class: Sequelize.STRING,
        grades: Sequelize.ARRAY(Sequelize.JSON),
        school_attendance: Sequelize.ARRAY(Sequelize.JSON),
      },
      {
        sequelize,
      }
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'responsible_id',
      as: 'responsible',
    })
  }
}

module.exports = Student
