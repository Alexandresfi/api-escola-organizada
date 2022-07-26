import * as Yup from 'yup'
import Student from '../models/Student'
import UserAdmin from '../models/UserAdmin'

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
      console.log(admin, 'aqui')
    } catch (err) {
      return response.status(400).json({ err: 'Você não tem permissão' })
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

      console.log(grades)

      return response.status(201).json({ student })
    } catch (err) {
      console.log('error at address', err)
    }
  }

  async index(request, response) {
    const students = await Student.findAll()

    console.log(response)

    return response.json(students)
  }
}

export default new StundentController()
