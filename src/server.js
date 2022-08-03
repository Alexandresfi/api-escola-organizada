const dotenv = require('dotenv')
const app = require('./app')

dotenv.config()

console.log(process.env.PORT)

app.listen(process.env.PORT || 3001, () => {
  console.log('🚀 Running server')
})
