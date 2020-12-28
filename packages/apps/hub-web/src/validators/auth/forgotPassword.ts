import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string().required('Campo Obrigatório')
})

export default schema
