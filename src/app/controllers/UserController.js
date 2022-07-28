import { v4 } from 'uuid'
import User from '../models/User'
import * as Yup from 'yup'
import UserAdmin from '../models/UserAdmin'

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      responsible_1: Yup.string().required(),
      email: Yup.string().email().required(),
      kinshi_1: Yup.string().required(),
      cpf_1: Yup.string().required().min(14).max(14),
      telephone_1: Yup.string().required().min(15).max(15),
      birthdate: Yup.string().required(),
      responsible_2: Yup.string().required(),
      kinshi_2: Yup.string().required(),
      cpf_2: Yup.string().required().min(14).max(14),
      telephone_2: Yup.string().required().min(15).max(15),
      password: Yup.string().required().min(8),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ err: err.errors })
    }

    const {
      responsible_1,
      email,
      kinshi_1,
      cpf_1,
      telephone_1,
      birthdate,
      responsible_2,
      kinshi_2,
      cpf_2,
      telephone_2,
      password,
    } = request.body

    try {
      const { type_acess: admin } = await UserAdmin.findByPk(request.userID)
      if (!admin) {
        throw new Error()
      }
    } catch (err) {
      return response.status(400).json({ err: 'Você não tem permissão' })
    }

    const userExists = await User.findOne({
      where: { email },
    })

    if (userExists) {
      return response.status(400).json({
        error:
          'Por favor, verifique os emails, os dois ou um deles já está cadastrado',
      })
    }

    const address_id = cpf_1

    const user = await User.create({
      id: v4(),
      responsible_1,
      email,
      kinshi_1,
      cpf_1,
      telephone_1,
      birthdate,
      responsible_2,
      kinshi_2,
      cpf_2,
      telephone_2,
      password,
      address_id,
    })

    return response
      .status(201)
      .json({ id: user.id, responsible_1, email, address_id })
  }

  async index(request, response) {
    try {
      const { type_acess: admin } = await UserAdmin.findByPk(request.userID)
      if (!admin) {
        throw new Error()
      }
    } catch (err) {
      return response.status(400).json({ err: 'Você não tem permissão' })
    }

    const users = await User.findAll()

    return response.json(users)
  }
}

export default new UserController()
