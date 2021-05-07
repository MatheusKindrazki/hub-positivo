import { store } from '~/store'

import createOptions, {
  profileOptions,
  schoolRestrictionRules,
  targetOptions
} from '../utils/createOptions'

const { categories } = store.getState().category
const { schools } = store.getState().school

export default [
  {
    name: 'category',
    placeholder: 'Selecione',
    options: createOptions(categories),
    label: 'Categoria'
  },
  {
    name: 'profiles',
    placeholder: 'Selecione',
    options: profileOptions,
    label: 'Perfis e Segmentos'
  },
  {
    name: 'schools_rule',
    placeholder: 'Selecione',
    options: schoolRestrictionRules,
    label: 'Escolas - Regra de restrição'
  },
  {
    name: 'target',
    placeholder: 'Selecione',
    options: targetOptions,
    label: 'Abrir em...'
  },
  {
    name: 'schools',
    placeholder: 'Selecione',
    options: createOptions(schools),
    label: 'Escolas'
  }
]
