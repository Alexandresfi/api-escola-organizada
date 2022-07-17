import { v4 } from 'uuid'
import User from '../models/User'

class UserController {
  async store(request, response) {
    const {
      responsible_1,
      email_1,
      kinshi_1,
      cpf_1,
      telephone_1,
      birthdate,
      responsible_2,
      email_2,
      kinshi_2,
      cpf_2,
      telephone_2,
      password_has,
      type_acess,
    } = request.body

    const user = await User.create({
      id: v4(),
      responsible_1,
      email_1,
      kinshi_1,
      cpf_1,
      telephone_1,
      birthdate,
      responsible_2,
      email_2,
      kinshi_2,
      cpf_2,
      telephone_2,
      password_has,
      type_acess,
    })

    return response.json(user)
  }
}

export default new UserController()
