import * as Yup from 'yup'

const schema = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'Titulo deve ter no mínimo 3 caracteres')
    .required('Campo Obrigatório'),
  descricao: Yup.string()
    .min(10, 'Descricao deve ter no mínimo 10 caracteres')
    .required('Campo Obrigatórioso'),
  link: Yup.string().url('link deve ser uma URL'),
  idCategoria: Yup.string().required('Campo Obrigatório'),
  profiles: Yup.string().required('Campo Obrigatório'),
  tipoRenderizacao: Yup.string().required('Campo Obrigatório'),
  schools_rule: Yup.string().required('Campo Obrigatório'),
  schools: Yup.string().required('Campo Obrigatório')
})

export default schema
