'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users-admins', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true, // isto quer dizer que id numca vai se repetir
      },

      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      telephone: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cpf: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      rg: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      gener: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      birthdate: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      password_has: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      type_acess: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'admin',
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users-admins')
  },
}
