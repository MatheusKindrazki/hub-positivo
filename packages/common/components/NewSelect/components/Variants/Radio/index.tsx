import React, { useContext } from 'react'

import classNames from 'classnames'

import { Radio, Box, Text } from '@psdhub/common/components'

import { ContainerOptions } from './styles'
import { useCheckedLogic } from '../logic'
import NotFound from '../../NotFound'
import SelectContext from '../../../context'

const RadioVariant: React.FC = () => {
  const context = useContext(SelectContext)

  const logic = useCheckedLogic(context)

  const { noOptionsMessage, handleClick, renderedOptions } = logic
  return (
    <ContainerOptions className="hub-select-options">
      {renderedOptions?.length ? (
        renderedOptions.map((option, index) => (
          <Box
            key={index}
            className={classNames({
              'hub-select-item': true
            })}
            onClick={() => handleClick(option, true)}
          >
            <Radio
              value={option.label}
              isChecked={!!logic.checkSelectedItem(option)}
              className={classNames({
                active: logic.checkSelectedItem(option)
              })}
              size="md"
            >
              <Text pointerEvents="none" color="black">
                {option.label}
              </Text>
            </Radio>
          </Box>
        ))
      ) : (
        <NotFound noOptionsMessage={noOptionsMessage as React.FC} />
      )}
    </ContainerOptions>
  )
}

export default RadioVariant
