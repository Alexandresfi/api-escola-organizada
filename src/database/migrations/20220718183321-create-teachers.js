'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teachers', {
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

      surname: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      school_class: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },

      school_subjects: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },

      cpf: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      rg: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      telephone: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      gener: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      birthdate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number_card: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      university: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      graduation_year: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      graduation_titles: {
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
        defaultValue: 'teacher',
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
    await queryInterface.dropTable('teachers')
  },
}
