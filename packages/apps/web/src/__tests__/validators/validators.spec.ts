import { ValidationError, getValidationErrors } from '~/validators'

describe('ValidationError should work properly', () => {
  it('ValidationError should return the correct error data', () => {
    const message = 'error message'
    const error = new ValidationError(message)

    expect(error).toBeInstanceOf(ValidationError)
    expect(error.message).toBe(message)
  })
})

describe('getValidationErrors should work properly', () => {
  it('getValidationErrors should give errors triggered by ValidationError', () => {
    const emailMessage = 'O formato do email é inválido'
    const passwordMessage = 'Senha deve ter pelo menos 5 caracters'
    const error = new ValidationError([
      new ValidationError(emailMessage, 'wrongEmail@', 'email'),
      new ValidationError(passwordMessage, '123', 'password')
    ])

    expect(getValidationErrors(error)).toStrictEqual({
      email: emailMessage,
      password: passwordMessage
    })
  })

  it('getValidationErrors should give errors triggered by ValidationError even when field name is not provided, replacing the fild with ` `', () => {
    const message = 'message'
    const error = new ValidationError([new ValidationError(message)])

    expect(getValidationErrors(error)).toStrictEqual({
      '': message
    })
  })
})
