import * as Yup from 'yup'
import Address from '../models/Address'
import UserAdmin from '../models/UserAdmin'

class AddressController {
  async store(request, response) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      zip_code: Yup.number()
        .min(8, 'o cep possui oito dígitos, apenas números sem pontos e -')
        .required(),
      street: Yup.string().required(),
      house_number: Yup.number().required(),
      complement: Yup.string().required(),
      city: Yup.string().required(),
      district: Yup.string().required(),
      state: Yup.string().required(),
    })

    try {
      const { type_acess: admin } = await UserAdmin.findByPk(request.userID)
      if (!admin) {
        throw new Error()
      }
    } catch (err) {
      return response.status(400).json({ err: 'you do not have permission' })
    }

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ err: err.errors })
    }

    const {
      id,
      zip_code,
      street,
      house_number,
      complement,
      city,
      district,
      state,
    } = request.body

    try {
      const address = await Address.create({
        id,
        zip_code,
        street,
        house_number,
        complement,
        city,
        district,
        state,
      })

      return response.status(201).json(address)
    } catch (err) {
      console.log('error at address', err)
    }
  }

  async index(request, response) {
    try {
      const { type_acess: admin } = await UserAdmin.findByPk(request.userID)
      if (!admin) {
        throw new Error()
      }
    } catch (err) {
      return response.status(400).json({ err: 'you do not have permission' })
    }

    const addresses = await Address.findAll()

    return response.json(addresses)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      zip_code: Yup.number().min(
        8,
        'o cep possui oito dígitos, apenas números sem pontos e -'
      ),
      street: Yup.string(),
      house_number: Yup.number(),
      complement: Yup.string(),
      city: Yup.string(),
      district: Yup.string(),
      state: Yup.string(),
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

    const {
      zip_code,
      street,
      house_number,
      complement,
      city,
      district,
      state,
    } = request.body

    const { id } = request.params

    try {
      const address = await Address.findByPk(id)
      if (!address) {
        throw new Error()
      }
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Check if the user of this address exists' })
    }

    try {
      await Address.update(
        {
          zip_code,
          street,
          house_number,
          complement,
          city,
          district,
          state,
        },
        { where: { id } }
      )

      return response.status(200).json()
    } catch (err) {
      console.log('error at address', err)
      return response.status(400).json(err)
    }
  }
}

export default new AddressController()
