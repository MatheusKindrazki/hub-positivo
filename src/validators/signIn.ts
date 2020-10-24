import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string().required('E-mail Obrigatório'),
  password: Yup.string().required('Senha Obrigatória'),
});

export default schema;
