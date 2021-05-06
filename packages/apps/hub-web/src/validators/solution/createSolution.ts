import * as Yup from 'yup'

const schema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Titulo deve ter no mínimo 3 caracteres')
    .required('Campo Obrigatório'),
  description: Yup.string()
    .min(10, 'Descricao deve ter no mínimo 10 caracteres')
    .required('Campo Obrigatório'),
  category: Yup.string().required('Campo Obrigatório'),
  profiles: Yup.string().required('Campo Obrigatório'),
  segments: Yup.string().required('Campo Obrigatório'),
  target: Yup.string().required('Campo Obrigatório'),
  schools_rule: Yup.string().required('Campo Obrigatório'),
  schools: Yup.string().required('Campo Obrigatório')
})

export default schema
