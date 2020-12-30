import * as Yup from 'yup'

const schema = Yup.object().shape({
  oldPassword: Yup.string().required('Campo Obrigatório'),
  newPassword: Yup.string()
    .min(5, 'Senha deve ter no mínimo 5 caracteres')
    .required('Senha Obrigatória'),
  confirmNewPassword: Yup.string()
    .oneOf(
      [Yup.ref('newPassword'), ''],
      'A senha confirmada está diferente da nova.'
    )
    .required('Confirmação da senha é obrigatória')
})

export default schema
