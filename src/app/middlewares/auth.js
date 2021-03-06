const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = (request, response, next) => {
  const authToken = request.headers.authorization

  !authToken && response.status(401).json({ error: 'Token não foi enviado' })

  const token = authToken.split(' ')[1]

  try {
    jwt.verify(token, authConfig.secret, function (err, decoded) {
      if (err) {
        throw new Error()
      }

      request.userID = decoded.id

      return next()
    })
  } catch (err) {
    return response.status(401).json({ error: 'Token inválido' })
  }
}
