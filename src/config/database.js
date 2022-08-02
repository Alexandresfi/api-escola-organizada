console.log('O banco de Dados >>>', process.env.DATABASE_URL)
module.exports = {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  define: {
    timespamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
