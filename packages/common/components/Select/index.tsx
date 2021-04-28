import React, { useMemo } from 'react'

import Select, { Props, mergeStyles } from 'react-select'
import classNames from 'classnames'

import { useTheme } from '@psdhub/common/layout/styles'

import { alternative, normal } from './styles'
export interface PropsSelect extends Props {
  variant: 'blue-transparent' | 'normal'
  inputHeight?: number
  styles?: Props['styles']
}

const HubSelect: React.FC<PropsSelect> = ({
  className,
  inputHeight,
  styles,
  variant,
  ...rest
}) => {
  const theme = useTheme()

  const renderStyleTheme = useMemo(() => {
    if (variant === 'blue-transparent') {
      return alternative(theme, inputHeight)
    }

    return normal(theme, inputHeight)
  }, [inputHeight, theme, variant])

  return (
    <>
      <Select
        styles={mergeStyles({ ...renderStyleTheme }, { ...styles })}
        clearable
        noOptionsMessage={() => 'Nada encontrado =('}
        className={classNames(className, {
          'blue-transparent': variant === 'blue-transparent',
          normal: variant === 'normal'
        })}
        classNamePrefix="hub-select"
        isSearchable
        {...rest}
      />
    </>
  )
}

export default HubSelect
