import createNewPasswordSchema from '~/validators/auth/createNewPassword'
import { ValidationError } from '~/validators'

describe('CreateNewPasswordSchema must check the format of the new password', () => {
  it('Should return a `min characters` error if password is smaller than 5 characters', async () => {
    const shape = {
      password: '123',
      'confirm-password': '123'
    }

    expect(createNewPasswordSchema.validate(shape)).rejects.toStrictEqual(
      new ValidationError('Senha deve ter no mínimo 5 caracteres')
    )
  })

  it('Should return error if password is different of confirm-password', () => {
    const shape = {
      password: 'otherPassword',
      'confirm-password': 'confirm-password'
    }

    expect(createNewPasswordSchema.validate(shape)).rejects.toStrictEqual(
      new ValidationError('A senha confirmada está diferente da nova.')
    )
  })

  it('Should return a `missing confirm-password` error if confirm-password was not provided', () => {
    const shape = {
      password: 'withoutConfirm'
    }

    expect(createNewPasswordSchema.validate(shape)).rejects.toStrictEqual(
      new ValidationError('Confirmação da senha é obrigatória')
    )
  })

  it('Should return the `shape` if `password` and `confirm-password` is correct', () => {
    const shape = {
      password: 'correct',
      'confirm-password': 'correct'
    }

    expect(createNewPasswordSchema.validate(shape)).resolves.toStrictEqual(
      shape
    )
  })
})
