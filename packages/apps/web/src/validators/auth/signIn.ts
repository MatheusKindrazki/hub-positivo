import * as Yup from 'yup'

const schema = Yup.object().shape({
  username: Yup.string().required('Usuário Obrigatório'),
  password: Yup.string().required('Senha Obrigatória')
})

export default schema
