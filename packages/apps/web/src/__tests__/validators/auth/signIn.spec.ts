import signInSchema from '~/validators/auth/signIn'
import { ValidationError } from '~/validators'

describe('signInSchema must check if the format of `shape` is correctly', () => {
  it('Should return a `missing username` error if username was not provided', async () => {
    const shape = {
      password: 'password'
    }

    expect(signInSchema.validate(shape)).rejects.toStrictEqual(
      new ValidationError('Usuário Obrigatório')
    )
  })

  it('Should return a `missing password` error if password was not provided', async () => {
    const shape = {
      username: 'username'
    }

    expect(signInSchema.validate(shape)).rejects.toStrictEqual(
      new ValidationError('Senha Obrigatória')
    )
  })

  it('Should return the `shape` if all data is correct', () => {
    const shape = {
      username: 'username',
      password: 'password'
    }

    expect(signInSchema.validate(shape)).resolves.toStrictEqual(shape)
  })
})
