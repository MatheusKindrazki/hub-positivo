import {
  profileOptions,
  schoolRestrictionRules,
  targetOptions
} from '../../utils/createOptions'

export interface Option {
  label: string
  value: string
}
interface Select {
  name: string
  placeholder: string
  options: Option[]
  label: string
  isMulti?: boolean
}

export const selects = (categories: Option[], schools: Option[]): Select[] => [
  {
    name: 'idCategoria',
    placeholder: 'Selecione',
    options: categories,
    label: 'Categoria'
  },
  {
    name: 'profiles',
    placeholder: 'Selecione',
    options: profileOptions,
    label: 'Perfis e Segmentos',
    isMulti: true
  },
  {
    name: 'padrao',
    placeholder: 'Selecione',
    options: schoolRestrictionRules,
    label: 'Escolas - Regra de restrição'
  },
  {
    name: 'tipoRenderizacao',
    placeholder: 'Selecione',
    options: targetOptions,
    label: 'Abrir em...'
  },
  {
    name: 'schools',
    placeholder: 'Selecione',
    options: schools,
    label: 'Escolas',
    isMulti: true
  }
]
