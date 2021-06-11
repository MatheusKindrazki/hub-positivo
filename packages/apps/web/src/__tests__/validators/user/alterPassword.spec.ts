import alterPassword from '~/validators/user/alterPassword'
import { ValidationError } from '~/validators'

describe('alterPassword must check the format of the new password', () => {
  it('Should return a `min characters` error if new password is smaller than 5 characters', async () => {
    const shape = {
      oldPassword: 'oldPassword',
      newPassword: 'new',
      confirmNewPassword: 'new'
    }

    expect(alterPassword.validate(shape)).rejects.toStrictEqual(
      new ValidationError('Senha deve ter no mínimo 5 caracteres')
    )
  })

  it('Should return an error if newPassword is different of confirmNewPassword', () => {
    const shape = {
      oldPassword: 'oldPassword',
      newPassword: 'otherPassword',
      confirmNewPassword: 'newPassword'
    }

    expect(alterPassword.validate(shape)).rejects.toStrictEqual(
      new ValidationError('A senha confirmada está diferente da nova.')
    )
  })

  it('Should return a `missing confirmNewPassword` error if confirmNewPassword was not provided', () => {
    const shape = {
      oldPassword: 'oldPassword',
      newPassword: 'otherPassword'
    }

    expect(alterPassword.validate(shape)).rejects.toStrictEqual(
      new ValidationError('Confirmação da senha é obrigatória')
    )
  })

  it('Should return a `missing oldPassword` error if oldPassword was not provided', () => {
    const shape = {
      newPassword: 'otherPassword',
      confirmNewPassword: 'otherPassword'
    }

    expect(alterPassword.validate(shape)).rejects.toStrictEqual(
      new ValidationError('Campo Obrigatório')
    )
  })

  it('Should return the `shape` if `password`, `confirm-password` and `oldPassword` is correct', () => {
    const shape = {
      oldPassword: 'oldPassword',
      newPassword: 'newPassword',
      confirmNewPassword: 'newPassword'
    }

    expect(alterPassword.validate(shape)).resolves.toStrictEqual(shape)
  })
})
