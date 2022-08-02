const { v4 } = require('uuid')
const User = require('../models/User')
const Yup = require('yup')
const UserAdmin = require('../models/UserAdmin')

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
      return response.status(401).json({ err: 'you do not have permission' })
    }

    try {
      const userExists = await User.findOne({
        where: { email },
      })
      if (userExists) {
        throw new Error()
      }
    } catch (error) {
      return response.status(400).json({
        error:
          'Please check the emails, both or one of them is already registered',
      })
    }

    const address_id = cpf_1

    try {
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
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async index(request, response) {
    try {
      const { type_acess: admin } = await UserAdmin.findByPk(request.userID)
      if (!admin) {
        throw new Error()
      }
    } catch (err) {
      return response.status(401).json({ err: 'you do not have permission' })
    }

    const users = await User.findAll()

    return response.status(200).json(users)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      responsible_1: Yup.string(),
      kinshi_1: Yup.string(),
      telephone_1: Yup.string().min(15).max(15),
      birthdate: Yup.string(),
      responsible_2: Yup.string(),
      kinshi_2: Yup.string(),
      telephone_2: Yup.string().min(15).max(15),
      password: Yup.string().min(8),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ err: err.errors })
    }

    const {
      responsible_1,
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
      return response.status(401).json({ err: 'you do not have permission' })
    }

    const { id } = request.params

    try {
      const userExists = await User.findByPk(id)

      if (!userExists) {
        throw new Error()
      }
    } catch (error) {
      return response.status(400).json({
        error: 'User does not exist',
      })
    }
    try {
      await User.update(
        {
          responsible_1,
          kinshi_1,
          cpf_1,
          telephone_1,
          birthdate,
          responsible_2,
          kinshi_2,
          cpf_2,
          telephone_2,
          password,
        },
        { where: { id } }
      )

      return response.status(201).json()
    } catch (error) {
      console.log(error)
      return response.status(400).json(error)
    }
  }

  async delete(request, response) {
    try {
      const admin = await UserAdmin.findByPk(request.userID)
      if (!admin) {
        throw new Error()
      }
    } catch (err) {
      return response.status(401).json({ err: 'you do not have permission' })
    }

    const { id } = request.params

    try {
      const user = await User.findByPk(id)
      if (!user) {
        throw new Error()
      }
    } catch (error) {
      return response.status(400).json({ message: 'user does exist' })
    }

    try {
      await User.destroy({ where: { id } })
      return response.status(200).json({ message: 'deleted user ' })
    } catch (error) {
      console.log('error: ', error)
      return response.status(400).json(error)
    }
  }
}

module.exports = new UserController()
