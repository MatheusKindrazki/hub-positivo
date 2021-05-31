import forgotPasswordSchema from '~/validators/auth/forgotPassword'
import { ValidationError } from '~/validators'

describe('forgotPasswordSchema must check if the format of `email` is correct', () => {
  it('Should return a `missing email` error if email was not provided', async () => {
    const shape = {}

    expect(forgotPasswordSchema.validate(shape)).rejects.toStrictEqual(
      new ValidationError('Campo Obrigatório')
    )
  })

  it('Should return `shape` if email`s formart is correct', () => {
    const shape = {
      email: 'email@email'
    }

    expect(forgotPasswordSchema.validate(shape)).resolves.toStrictEqual(shape)
  })
})
