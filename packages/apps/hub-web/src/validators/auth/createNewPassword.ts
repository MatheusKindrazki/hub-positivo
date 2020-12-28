import * as Yup from 'yup'

const schema = Yup.object().shape({
  password: Yup.string()
    .min(5, 'Senha deve ter no mínimo 5 caracteres')
    .required('Senha Obrigatória'),
  'confirm-password': Yup.string()
    .oneOf(
      [Yup.ref('password'), ''],
      'A senha confirmada está diferente da nova.'
    )
    .required('Confirmação da senha é obrigatória')
})

export default schema
