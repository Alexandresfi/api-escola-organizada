import * as Yup from 'yup'
import Student from '../models/Student'

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
}

export default new StundentController()
