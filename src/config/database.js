console.log(process.env.DATABASE_PORT)
module.exports = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  port: process.env.DATABASE_PORT,
  define: {
    timespamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
