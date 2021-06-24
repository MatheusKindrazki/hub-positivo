import React, { useState, useCallback } from 'react'

import classNames from 'classnames'

import { Box, Text } from '@psdhub/common/components'

import { Container } from './styles'
import { NewSelectProps, Option } from '../../../types'

const VariantColors: React.FC<NewSelectProps> = props => {
  const { variant, isMulti, options } = props

  const [selection, setSelection] = useState<string[]>([])

  const handleSelect = useCallback(
    (option: Option) => {
      if (!selection.some(current => current === option.value)) {
        if (!isMulti) {
          setSelection([option.value])
        } else if (isMulti) {
          setSelection([...selection, option.value])
        }
      } else {
        let selectionAfterRemoval = selection
        selectionAfterRemoval = selectionAfterRemoval.filter(
          current => current !== option.value
        )
        setSelection([...selectionAfterRemoval])
      }
    },
    [isMulti, selection]
  )

  return (
    <Container variant={variant}>
      {options?.map((option, i) => (
        <Box
          key={i}
          role="button"
          className={classNames({
            active: selection.some(current => current === option.value)
          })}
          onClick={() => handleSelect(option)}
        >
          <Text>{option.label}</Text>
        </Box>
      ))}
    </Container>
  )
}

export default VariantColors
