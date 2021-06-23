import React from 'react'

import Select, {
  components,
  Props,
  mergeStyles,
  OptionProps,
  GroupTypeBase
} from 'react-select'

import { useTheme } from '@psdhub/common/layout/styles'
import { Box, Radio, Text, Divider } from '@psdhub/common/components'

import { forwardRef } from '@chakra-ui/react'

import { checkbox } from '../styles'
import { prefixClass } from '../options'

type Values = {
  label: string
  value: string
  divider?: boolean
}

export type OptionCheckboxProps = React.ComponentType<
  OptionProps<Values, false, GroupTypeBase<Values>>
>

export type PropsSelect<T> = Props & {
  inputHeight?: number
  styles?: Props['styles']
  defaultValue?: T
  error?: boolean
  isMulti?: boolean
}

const Option: OptionCheckboxProps = props => {
  return (
    <>
      <Box as={components.Option} p="9" {...props}>
        <Radio size="md" name={props?.label} isChecked={props.isSelected}>
          <Text color="black">{props?.label}</Text>
        </Radio>
      </Box>
      {props.data?.divider && <Divider borderColor="gray.400" />}
    </>
  )
}

const addOptionsAll = (
  data: PropsSelect['options']
): PropsSelect['options'] => {
  const all = {
    value: data?.map(e => e.value),
    label: 'Todos',
    divider: true
  }

  return [all, ...(data as any)]
}

const HubSelectCheckbox = forwardRef<PropsSelect, 'select'>((props, ref) => {
  const { className, inputHeight, styles, isMulti, error, options, ...rest } =
    props

  const theme = useTheme()

  const prepareOptions = !isMulti ? options : addOptionsAll(options)

  return (
    <Select
      ref={ref}
      components={{ Option }}
      styles={mergeStyles(
        { ...checkbox({ theme, inputHeight, error }) },
        { ...styles }
      )}
      clearable
      noOptionsMessage={() => 'Nada encontrado =('}
      className={className}
      classNamePrefix={`${prefixClass}-checkbox`}
      isSearchable
      options={prepareOptions}
      {...rest}
    />
  )
})

export default HubSelectCheckbox
