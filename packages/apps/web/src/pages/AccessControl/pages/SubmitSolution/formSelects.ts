import { Option } from '~/store/modules/solutions/types'

import { FormProps } from '@psdhub/common/components/Form'

import { schoolRestrictionRules, targetOptions } from './utils/createOptions'

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

const handleSelectedOption = (
  option: Option,
  formRef: React.RefObject<FormProps>
) => {
  const schoolSelectRef = formRef.current?.getFieldRef('schools')
  const { select } = schoolSelectRef
  const { inputRef } = select

  if (option.value === 'todas escolas') {
    inputRef.setAttribute('disabled', true)
    return select.clearValue()
  }
  inputRef.removeAttribute('disabled')
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
      onChange: option => handleSelectedOption(option, ref)
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