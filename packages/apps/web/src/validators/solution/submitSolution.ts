import * as Yup from 'yup'

export const updateSolution = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'Titulo deve ter no mínimo 3 caracteres')
    .max(50, 'Titulo deve ter no máximo 50 caracteres')
    .required('Campo Obrigatório'),
  descricao: Yup.string()
    .min(10, 'Descricao deve ter no mínimo 10 caracteres')
    .max(255, 'Descricao deve ter no máximo 255 caracteres')
    .required('Campo Obrigatório'),
  link: Yup.string().url('link deve ser uma URL').required(),
  idCategoria: Yup.string().required('Campo Obrigatório'),
  profiles: Yup.array(),
  tipoRenderizacao: Yup.string().required('Campo Obrigatório'),
  padrao: Yup.string().required('Campo Obrigatório'),
  schools: Yup.array().when('padrao', {
    is: 'todas escolas',
    then: Yup.array().notRequired(),
    otherwise: Yup.array().min(1, 'Selecione pelo menos uma escola').required()
  })
})

export const createSolution = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'Titulo deve ter no mínimo 3 caracteres')
    .max(50, 'Titulo deve ter no máximo 50 caracteres')
    .required('Campo Obrigatório'),
  descricao: Yup.string()
    .min(10, 'Descricao deve ter no mínimo 10 caracteres')
    .max(255, 'Descricao deve ter no máximo 255 caracteres')
    .required('Campo Obrigatório'),
  link: Yup.string().url('link deve ser uma URL').required(),
  idCategoria: Yup.string().required('Campo Obrigatório'),
  profiles: Yup.array(),
  tipoRenderizacao: Yup.string().required('Campo Obrigatório'),
  padrao: Yup.string().required('Campo Obrigatório'),
  schools: Yup.array().when('padrao', {
    is: 'todas escolas',
    then: Yup.array().notRequired(),
    otherwise: Yup.array().min(1, 'Selecione pelo menos uma escola').required()
  }),
  arquivo: Yup.string().required('Campo Obrigatório')
})
