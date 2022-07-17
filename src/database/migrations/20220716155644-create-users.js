'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true, // isto quer dizer que id numca vai se repetir
      },

      responsible_1: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      kinshi_1: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cpf_1: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },

      telephone_1: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      birthdate: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email_1: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      responsible_2: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      kinshi_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cpf_2: {
        type: Sequelize.STRING,
        allowNull: true,
        primaryKey: true,
      },

      telephone_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email_2: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      password_has: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      type_acess: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('users')
  },
}
