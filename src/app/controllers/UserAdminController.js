const { v4 } = require('uuid')
const Yup = require('yup')
const UserAdmin = require('../models/UserAdmin')

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

    try {
      const { type_acess: admin } = await UserAdmin.findByPk(request.userID)
      if (!admin) {
        throw new Error()
      }
    } catch (err) {
      return response.status(401).json({ err: 'you do not have permission' })
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
            'Please check the emails, both or one of them is already registered',
        })
      }
    } catch (err) {
      console.log(err)
      return response.status(400).json({
        error:
          'Please check the emails, both or one of them is already registered',
      })
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
      return response.status(400).json()
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

    const users = await UserAdmin.findAll()

    return response.json(users)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      fullname: Yup.string(),
      email: Yup.string().email(),
      telephone: Yup.string().min(15).max(15),
      cpf: Yup.string().min(14).max(14),
      rg: Yup.string(),
      birthdate: Yup.string(),
      gener: Yup.string(),
      password: Yup.string().min(8),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ err: err.errors })
    }

    try {
      const { type_acess: admin } = await UserAdmin.findByPk(request.userID)
      if (!admin) {
        throw new Error()
      }
    } catch (err) {
      return response.status(401).json({ err: 'you do not have permission' })
    }

    const { fullname, email, telephone, cpf, rg, birthdate, password, gener } =
      request.body

    const { id } = request.params

    try {
      const userAdmin = await UserAdmin.findByPk(id)
      if (!userAdmin) {
        throw new Error()
      }
    } catch (error) {
      return response.status(400).json({ error: 'User does not exist' })
    }

    try {
      await UserAdmin.update(
        {
          fullname,
          email,
          telephone,
          cpf,
          birthdate,
          rg,
          gener,
          password,
        },
        { where: { id } }
      )

      return response.status(200).json()
    } catch (err) {
      console.log(err)
      return response.status(400).json(err)
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
      const user = await UserAdmin.findByPk(id)
      if (!user) {
        throw new Error()
      }
    } catch (error) {
      return response.status(400).json({ message: 'user does exist' })
    }

    try {
      await UserAdmin.destroy({ where: { id } })
      return response.status(200).json({ message: 'deleted user ' })
    } catch (error) {
      console.log('error: ', error)
      return response.status(400).json(error)
    }
  }
}

module.exports = new UserAdminController()
