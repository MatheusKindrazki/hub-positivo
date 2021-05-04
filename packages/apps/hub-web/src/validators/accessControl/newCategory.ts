import * as Yup from 'yup'

const schema = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'O nome da categoria deve ter no mínimo 3 caracteres')
    .required('O nome da categoria é obrigatório')
})

export default schema
