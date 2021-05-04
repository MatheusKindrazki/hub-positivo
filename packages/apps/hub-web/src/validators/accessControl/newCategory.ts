import * as Yup from 'yup'

const schema = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'A categoria deve ter no mínimo 3 caracteres')
    .required('Categoria obrigatória')
})

export default schema
