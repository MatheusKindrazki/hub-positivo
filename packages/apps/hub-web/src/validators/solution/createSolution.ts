import * as Yup from 'yup'

const schema = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'Titulo deve ter no mínimo 3 caracteres')
    .max(50, 'Titulo deve ter no máximo 50 caracteres')
    .required('Campo Obrigatório'),
  descricao: Yup.string()
    .min(10, 'Descricao deve ter no mínimo 10 caracteres')
    .max(255, 'Descricao deve ter no máximo 255 caracteres')
    .required('Campo Obrigatório'),
  link: Yup.string().url('link deve ser uma URL'),
  idCategoria: Yup.string().required('Campo Obrigatório'),
  profiles: Yup.array(),
  tipoRenderizacao: Yup.string().required('Campo Obrigatório'),
  padrao: Yup.string().required('Campo Obrigatório'),
  schools: Yup.array()
})

export default schema
