import { v4 } from 'uuid'
import * as Yup from 'yup'
import UserAdmin from '../models/UserAdmin'

class UserAdminController {
  async store(request, response) {
    const schema = Yup.object().shape({
      fullname: Yup.string().required(),
      email: Yup.string().email().required(),
      telephone: Yup.string().required().min(15).max(15),
      cpf: Yup.string().required().min(14).max(14),
      rg: Yup.string().required(),
      birthdate: Yup.string().required(),
      gener: Yup.string().required(),
      password: Yup.string().required().min(8),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ err: err.errors })
    }

    const { fullname, email, telephone, cpf, rg, birthdate, password, gener } =
      request.body

    try {
      const userExists = await UserAdmin.findOne({
        where: { email },
      })

      if (userExists) {
        return response.status(400).json({
          error:
            'Por favor, verifique os emails, os dois ou um deles já está cadastrado',
        })
      }
    } catch (err) {
      console.log(err)
    }

    try {
      const user = await UserAdmin.create({
        id: v4(),
        fullname,
        email,
        telephone,
        cpf,
        birthdate,
        rg,
        gener,
        password,
      })

      return response
        .status(201)
        .json({ id: user.id, fullname, email, type_acess: user.type_acess })
    } catch (err) {
      console.log(err)
    }
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

    const users = await UserAdmin.findAll()

    return response.json(users)
  }

  async update(request, response) {}
}

export default new UserAdminController()
