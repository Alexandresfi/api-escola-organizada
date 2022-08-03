const dotenv = require('dotenv')
const app = require('./app')

dotenv.config()

console.log(process.env.DATABASE_PORT)

app.listen(process.env.DATABASE_PORT || 3001, () => {
  console.log('🚀 Running server')
})
