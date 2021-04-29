import { Props } from 'react-select'

import { Theme } from '@psdhub/common/layout/styles'

function normal(theme: Theme, inputHeight?: number): Props['styles'] {
  const { colors, shadows, fontSizes } = theme

  const height = inputHeight || 48

  return {
    control: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      color: colors.white,
      minHeight: height,
      fontSize: fontSizes.sm,
      borderRadius: 8,
      backgroundColor: colors.gray[200],
      boxShadow: state.isFocused
        ? `0 0 0 1px ${colors.blue[500]}`
        : provided.boxShadow,
      borderColor: state.isFocused ? colors.blue[500] : provided.borderColor,
      '&:hover': {
        borderColor: colors.blue[500]
      },

      svg: {
        transform: state.isFocused ? 'rotate(180deg)' : 'none'
      }
    }),
    indicatorSeparator: () => ({
      opacity: 0
    }),
    indicatorsContainer: () => ({
      svg: {
        fill: colors.blue[500],
        transition: 'all .2s linear'
      }
    }),
    container: provided => ({
      ...provided,
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
      backgroundColor: colors.white,
      borderRadius: 4,
      overflow: 'hidden',
      color: 'white',
      textTransform: 'capitalize',
      zIndex: 99,
      boxShadow: shadows['dark-lg'],
      borderWidth: 1,
      borderColor: colors.gray[100]
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? colors.blue[500] : 'transparent',
      color: state.isSelected ? colors.white : colors.black,
      textTransform: 'capitalize',
      fontSize: fontSizes.sm,
      fontWeight: 'normal',
      cursor: 'pointer',
      width: '100%',

      '&:active': {
        color: colors.white,
        backgroundColor: colors.blue[600]
      }
    })
  }
}

function alternative(theme: Theme, inputHeight?: number): Props['styles'] {
  const { colors, shadows, fontSizes } = theme

  const height = inputHeight || 48

  return {
    control: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      color: colors.white,
      minHeight: height,
      fontSize: fontSizes.md,
      borderRadius: 8,
      backgroundColor: 'transparent',
      borderColor: `${colors.white}!important`,
      boxShadow: 'none!important',
      '*': {
        color: `${colors.white}!important`
      },

      svg: {
        transform: state.isFocused ? 'rotate(180deg)' : 'none'
      }
    }),
    indicatorSeparator: () => ({
      opacity: 0
    }),
    indicatorsContainer: () => ({
      svg: {
        fill: colors.white,
        transition: 'all .2s linear'
      }
    }),
    container: provided => ({
      ...provided,
      textTransform: 'capitalize',
      backgroundColor: 'transparent'
    }),
    input: provided => ({
      ...provided,
      color: 'white!important',
      textTransform: 'capitalize'
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: colors.blue[500],
      borderColor: colors.blue[700],
      borderRadius: 4,
      overflow: 'hidden',
      textTransform: 'capitalize',
      zIndex: 99,
      boxShadow: shadows['dark-lg'],
      borderWidth: 1
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? colors.blue[400] : colors.blue[500],
      color: colors.white,
      textTransform: 'capitalize',
      fontSize: fontSizes.md,
      fontWeight: 'normal',
      cursor: 'pointer',
      width: '100%',

      '&:active': {
        color: colors.white,
        backgroundColor: colors.blue[600]
      }
    })
  }
}

export { normal, alternative }
