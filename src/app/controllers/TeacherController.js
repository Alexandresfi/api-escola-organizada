import { v4 } from 'uuid'
import * as Yup from 'yup'
import Teacher from '../models/Teacher'
import UserAdmin from '../models/UserAdmin'

class TeacherController {
  async store(request, response) {
    const schema = Yup.object().shape({
      fullname: Yup.string().required(),
      surname: Yup.string().required(),
      email: Yup.string().email().required(),
      birthdate: Yup.string().required(),
      gener: Yup.string().required(),
      telephone: Yup.string().min(14).max(14).required(),
      number_card: Yup.string().required(),
      cpf: Yup.string().min(14).max(14).required(),
      rg: Yup.string().required(),
      university: Yup.string().required(),
      graduation_year: Yup.string().required(),
      graduation_titles: Yup.string().required(),
      password: Yup.string().required().min(8),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ err: err.errors })
    }

    const {
      fullname,
      surname,
      gener,
      email,
      telephone,
      birthdate,
      cpf,
      rg,
      number_card,
      university,
      graduation_titles,
      graduation_year,
      password,
      school_class,
      school_subjects,
    } = request.body

    try {
      const { type_acess: admin } = await UserAdmin.findByPk(request.userID)
      if (!admin) {
        throw new Error()
      }
    } catch (err) {
      return response.status(400).json({ err: 'Você não tem permissão' })
    }

    try {
      const userExists = await Teacher.findOne({
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

    const address_id = cpf

    try {
      const teacher = await Teacher.create({
        id: v4(),
        fullname,
        surname,
        gener,
        birthdate,
        telephone,
        email,
        cpf,
        rg,
        number_card,
        university,
        graduation_year,
        graduation_titles,
        password,
        address_id,
        school_class,
        school_subjects,
      })

      return response
        .status(201)
        .json({ id: teacher.id, fullname, email, school_class })
    } catch (err) {
      console.log('error created teacher', err)
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

    const teachers = await Teacher.findAll()

    return response.json(teachers)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      fullname: Yup.string(),
      surname: Yup.string(),
      birthdate: Yup.string(),
      gener: Yup.string(),
      telephone: Yup.string().min(15).max(15),
      number_card: Yup.string(),
      cpf: Yup.string().min(14).max(14),
      rg: Yup.string(),
      university: Yup.string(),
      graduation_year: Yup.string(),
      graduation_titles: Yup.string(),
      password: Yup.string().min(8),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ err: err.errors })
    }

    const {
      fullname,
      surname,
      gener,
      telephone,
      birthdate,
      cpf,
      rg,
      number_card,
      university,
      graduation_titles,
      graduation_year,
      password,
      school_class,
      school_subjects,
    } = request.body

    try {
      const { type_acess: admin } = await UserAdmin.findByPk(request.userID)
      if (!admin) {
        throw new Error()
      }
    } catch (err) {
      return response.status(400).json({ err: 'Você não tem permissão' })
    }

    const { id } = request.params

    try {
      const teacherExists = await Teacher.findByPk(id)
      if (!teacherExists) {
        throw new Error()
      }
    } catch (err) {
      return response.status(401).json({ err: 'usuário não existe' })
    }

    try {
      await Teacher.update(
        {
          fullname,
          surname,
          gener,
          birthdate,
          telephone,
          cpf,
          rg,
          number_card,
          university,
          graduation_year,
          graduation_titles,
          password,
          school_class,
          school_subjects,
        },
        { where: { id } }
      )

      return response
        .status(201)
        .json({ message: 'usário alterado com sucesso!' })
    } catch (err) {
      console.log('error updated teacher', err)
    }
  }
}

export default new TeacherController()
