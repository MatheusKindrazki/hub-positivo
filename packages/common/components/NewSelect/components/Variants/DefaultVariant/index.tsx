import React from 'react'

import classNames from 'classnames'

import { Box, Text } from '@psdhub/common/components'

import { ContainerOptions } from './styles'
import { useCheckedLogic } from '../logic'
import NotFound from '../../NotFound'
import { useSelect } from '../../../context'

const DefaultVariant: React.FC = () => {
  const context = useSelect()

  const logic = useCheckedLogic(context)

  const { handleClick, noOptionsMessage, renderedOptions } = logic

  return (
    <ContainerOptions className="hub-select-options">
      {renderedOptions?.length ? (
        renderedOptions.map((option, index) => (
          <Box
            key={index}
            className={classNames({
              active: logic.checkSelectedItem(option),
              'hub-select-item': true
            })}
            role="button"
            onClick={() => handleClick(option)}
          >
            <Text pointerEvents="none" color="black">
              {option.label}
            </Text>
          </Box>
        ))
      ) : (
        <NotFound noOptionsMessage={noOptionsMessage as React.FC} />
      )}
    </ContainerOptions>
  )
}

export default DefaultVariant
