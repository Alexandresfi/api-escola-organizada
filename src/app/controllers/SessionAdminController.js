import * as Yup from 'yup'

import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

import UserAdmin from '../models/UserAdmin'

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

    return response.json({
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

export default new SessionAdminController()
