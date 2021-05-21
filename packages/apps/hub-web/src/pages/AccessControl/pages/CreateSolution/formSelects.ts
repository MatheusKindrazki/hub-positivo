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
  w?: string | string[]
  isDisabled?: boolean | undefined
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
      w: ['100%', '100%', '48.5%']
    },
    {
      name: 'profiles',
      placeholder: 'Selecione',
      options: profiles,
      label: 'Perfis e segmentos',
      isMulti: true,
      w: ['100%', '100%', '48.5%']
    },
    {
      name: 'tipoRenderizacao',
      placeholder: 'Selecione',
      options: targetOptions,
      label: 'Abrir em...',
      w: ['100%', '100%', '48.5%']
    },
    {
      name: 'padrao',
      placeholder: 'Selecione',
      options: schoolRestrictionRules,
      label: 'Regra de escolas',
      w: ['100%', '100%', '48.5%'],
      onChange: (option: Option) => {
        if (option.value === 'todas escolas') {
          const schoolsRef = ref.current?.getFieldRef('schools')
          schoolsRef.select.clearValue()
        }
      }
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
