const Yup = require('yup')
const Student = require('../models/Student')
const UserAdmin = require('../models/UserAdmin')

class StundentController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      year: Yup.number().required(),
      school_class: Yup.string(),
      responsible_id: Yup.string().email().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ err: err.errors })
    }

    const {
      name,
      year,
      school_class,
      responsible_id,
      grades,
      school_attendance,
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
      const student = await Student.create({
        name,
        year,
        school_class,
        responsible_id,
        grades,
        school_attendance,
      })

      return response.status(201).json({ student })
    } catch (err) {
      console.log('error at address', err)
      return response.status(400).json()
    }
  }

  async index(request, response) {
    try {
      const students = await Student.findAll()

      return response.json(students)
    } catch (error) {
      return response.status(400).json({ err: error })
    }
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      year: Yup.number(),
      school_class: Yup.string(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ err: err.errors })
    }

    const { name, year, school_class, grades, school_attendance } = request.body

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
      const student = await Student.findByPk(id)
      if (!student) {
        throw new Error()
      }
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'This student does not exist' })
    }

    try {
      await Student.update(
        {
          name,
          year,
          school_class,
          grades,
          school_attendance,
        },

        { where: { id } }
      )

      return response.status(200).json()
    } catch (err) {
      console.log('error at students', err)
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
      const student = await Student.findByPk(id)
      if (!student) {
        throw new Error()
      }
    } catch (error) {
      return response.status(400).json({ message: 'student does exist' })
    }

    try {
      await Student.destroy({ where: { id } })
      return response.status(200).json({ message: 'deleted student ' })
    } catch (error) {
      console.log('error: ', error)
      return response.status(400).json(error)
    }
  }
}

module.exports = new StundentController()
