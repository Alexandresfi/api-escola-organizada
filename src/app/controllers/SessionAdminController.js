const Yup = require('yup')

const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const UserAdmin = require('../models/UserAdmin')

class SessionAdminController {
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

    const user = await UserAdmin.findOne({
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
      fullname: user.fullname,
      email,
      type_acess: user.type_acess,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

module.exports = new SessionAdminController()
