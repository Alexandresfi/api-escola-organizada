const Yup = require('yup')

const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const User = require('../models/User')

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const userEmailOrPasswordIncorrect = () => {
      return response.status(400).json({ error: 'Senha ou email incorreto' })
    }

    if (!(await schema.isValid(request.body))) {
      userEmailOrPasswordIncorrect()
    }

    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      userEmailOrPasswordIncorrect()
    }

    if (!(await user.checkPassword(password))) {
      userEmailOrPasswordIncorrect()
    }

    return response.status(200).json({
      id: user.id,
      email,
      responsible_1: user.responsible_1,
      responsible_2: user.responsible_2,
      address: user.address_id,
      type_acess: user.type_acess,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

module.exports = new SessionController()
