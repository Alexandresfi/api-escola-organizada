import { v4 } from 'uuid'
import User from '../models/User'
import * as Yup from 'yup'

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      responsible_1: Yup.string().required(),
      email_1: Yup.string().email().required(),
      kinshi_1: Yup.string().required(),
      cpf_1: Yup.string().required().min(14).max(14),
      telephone_1: Yup.string().required().min(15).max(15),
      birthdate: Yup.string().required(),
      responsible_2: Yup.string().required(),
      email_2: Yup.string().email().required(),
      kinshi_2: Yup.string().required(),
      cpf_2: Yup.string().required().min(14).max(14),
      telephone_2: Yup.string().required().min(15).max(15),
      password: Yup.string().required().min(8),
      type_acess: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ err: err.errors })
    }

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
      password,
      type_acess,
    } = request.body

    const userExists = await User.findOne({
      where: { email_1, email_2 },
    })

    if (userExists) {
      return response.status(400).json({
        error:
          'Por favor, verifique os emails, os dois ou um deles já está cadastrado',
      })
    }

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
      password,
      type_acess,
    })

    return response
      .status(201)
      .json({ id: user.id, responsible_1, email_1, type_acess })
  }
}

export default new UserController()
