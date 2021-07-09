import React, { useRef, useContext, memo } from 'react'

import classNames from 'classnames'

import { useDisclosure, useOnClickOutside } from '@psdhub/common/hooks'
import { Box } from '@psdhub/common/components'

import { SelectProps, TreeNode } from './types'
import { Container } from './styles'
import SelectContext from './context'
import options from './components/Variants/options'
import { Icon, Control, ContainerOptions } from './components'

const Select: React.FC<SelectProps> = props => {
  const context = useContext(SelectContext)

  const containerRef = useRef<HTMLDivElement>(null)

  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: true })

  context.onClose = onClose
  context.options = props.options
  context.isMulti = props.isMulti

  context.onChange = (checked: string[], raw: TreeNode[]) => {
    console.log(checked, raw)

    context.state = { checked, raw }
  }

  useOnClickOutside(containerRef, onClose, 'click')

  const Variant = options[props.variant || 'normal']

  return (
    <Container ref={containerRef} className="hub-select-wrapper">
      <Box role="button" className="hub-select-header" onClick={onToggle}>
        <Box className="hub-select-header-title">
          <Control focus={isOpen} />
        </Box>
        <Icon open={isOpen} />
      </Box>
      {isOpen && (
        <ContainerOptions
          className={classNames({
            'header-select-list': true,
            searchable: true
          })}
        >
          <Variant />
        </ContainerOptions>
      )}
    </Container>
  )
}

export default memo(Select)
