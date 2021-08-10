import React from 'react'

import classNames from 'classnames'

import { Checkbox, Box, Text } from '@psdhub/common/components'

import { ContainerOptions } from './styles'
import AllValues from './components/AllValues'
import { useCheckedLogic } from '../logic'
import NotFound from '../../NotFound'
import { useSelect } from '../../../context'
import { TreeNode } from '../../../../Tree'

const RadioVariant: React.FC = () => {
  // const storeValuesRef = useRef({options:})
  const context = useSelect()

  const { isMulti } = context

  const logic = useCheckedLogic(context)

  const { noOptionsMessage, handleClick, renderedOptions } = logic
  return (
    <ContainerOptions className="hub-select-options">
      {renderedOptions?.length ? (
        <>
          {isMulti && (
            <AllValues
              index={999}
              values={renderedOptions}
              text={logic.allSelectMessage}
              isChecked={context.getState().checked}
              handleClick={(all: TreeNode[]) => handleClick(all, true)}
            />
          )}
          {renderedOptions.map((option, index) => (
            <Box
              role="button"
              key={index}
              className={classNames({
                'hub-select-item': true
              })}
            >
              <Checkbox
                value={option.label}
                w="100%"
                h="100%"
                onChange={() => handleClick(option, false)}
                defaultChecked={!!logic.checkSelectedItem(option)}
                // isChecked={!!logic.checkSelectedItem(option)}
                className={classNames({
                  active: logic.checkSelectedItem(option)
                })}
                size="md"
              >
                <Text pointerEvents="none" color="black">
                  {option.label}
                </Text>
              </Checkbox>
            </Box>
          ))}
        </>
      ) : (
        <NotFound noOptionsMessage={noOptionsMessage as React.FC} />
      )}
    </ContainerOptions>
  )
}

export default RadioVariant
