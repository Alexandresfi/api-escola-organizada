'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'address_id', {
      type: Sequelize.STRING,
      references: { model: 'addresses', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      primaryKey: true,
      allowNull: true,
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'address_id')
  },
}
