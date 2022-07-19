import * as Yup from 'yup'
import Address from '../models/Address'

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
}

export default new AddressController()
