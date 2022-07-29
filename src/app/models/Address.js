import Sequelize, { Model } from 'sequelize'

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        zip_code: Sequelize.INTEGER,
        street: Sequelize.STRING,
        house_number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        district: Sequelize.STRING,
        state: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
    return this
  }
}

export default Address
