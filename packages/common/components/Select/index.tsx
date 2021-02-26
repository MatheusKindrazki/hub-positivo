import React from 'react'

import { Props } from 'react-select'
import Select from 'react-select'
import classNames from 'classnames'

import GlobalSelectStyle from './styles'
import { useTheme } from '../../layout'

export interface PropsSelect extends Props {
  variant: 'blue-transparent' | 'normal'
}

const HubSelect: React.FC<PropsSelect> = ({ className, variant, ...rest }) => {
  const { colors, shadows } = useTheme()

  const transparentColor: Props['styles'] = {
    control: provided => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: 'white'
    }),
    placeholder: provided => ({
      ...provided,
      color: 'white'
    }),
    container: provided => ({
      ...provided,
      backgroundColor: 'transparent',
      color: 'white',
      textTransform: 'capitalize'
    }),
    input: provided => ({
      ...provided,
      color: 'white',
      textTransform: 'capitalize'
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: colors.blue[500],
      color: 'white',
      borderColor: colors.blue[700],
      textTransform: 'capitalize',
      zIndex: 99,
      boxShadow: shadows['dark-lg']
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? colors.blue[400] : colors.blue[500],
      color: 'white',
      textTransform: 'capitalize',
      cursor: 'pointer',

      '&:active': {
        color: 'white',
        backgroundColor: colors.blue[600]
      }
    })
  }

  const normal: Props['styles'] = {
    menu: provided => ({
      ...provided,
      zIndex: 99
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? colors.blue[500] : 'transparent',

      color: state.isSelected ? 'white' : 'black',

      '&:active': {
        backgroundColor: colors.blue[600],
        color: 'white'
      }
    })
  }

  return (
    <>
      <Select
        styles={variant === 'blue-transparent' ? transparentColor : normal}
        clearable
        noOptionsMessage={() => 'Nada encontrado =('}
        className={classNames(className, {
          'hub-select': true,
          'blue-transparent': variant === 'blue-transparent',
          normal: variant === 'normal'
        })}
        classNamePrefix="hub"
        isSearchable
        {...rest}
      />
      <GlobalSelectStyle />
    </>
  )
}

export default HubSelect
