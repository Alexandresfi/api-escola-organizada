'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      school_class: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      grades: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: true,
      },

      school_attendance: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: true,
      },

      responsible_id: {
        type: Sequelize.STRING,
        references: { model: 'users', key: 'email' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('students')
  },
}
