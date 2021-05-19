import { FormProps } from '@psdhub/common/components/Form'

import {
  schoolRestrictionRules,
  targetOptions
} from '../../utils/createOptions'

export interface Option {
  label: string
  value: string
}

interface Options {
  [key: string]: Option[]
}
interface Select {
  name: string
  placeholder: string
  options: Option[]
  label: string
  isMulti?: boolean
  w?: string
  isDisabled?: boolean
  onChange?: (value: any) => void
}

export const selects = (
  options: Options,
  ref: React.RefObject<FormProps>
): Select[] => {
  const { categories, schools, profiles } = options
  return [
    {
      name: 'idCategoria',
      placeholder: 'Selecione',
      options: categories,
      label: 'Categoria',
      w: '48.5%'
    },
    {
      name: 'profiles',
      placeholder: 'Selecione',
      options: profiles,
      label: 'Perfis e Segmentos',
      isMulti: true,
      w: '48.5%'
    },
    {
      name: 'padrao',
      placeholder: 'Selecione',
      options: schoolRestrictionRules,
      label: 'Escolas - Regra de restrição',
      w: '48.5%',
      onChange: (option: Option) => {
        if (option.value === 'todas escolas') {
          const padraoRef = ref.current?.getFieldRef('schools')
          padraoRef.select.clearValue()
        }
      }
    },
    {
      name: 'tipoRenderizacao',
      placeholder: 'Selecione',
      options: targetOptions,
      label: 'Abrir em...',
      w: '48.5%'
    },
    {
      name: 'schools',
      placeholder: 'Selecione',
      options: schools,
      label: 'Escolas',
      isMulti: true,
      w: '100%'
    }
  ]
}
