import React, { useRef, useContext, memo, forwardRef } from 'react'

import classNames from 'classnames'

import { useDisclosure, useOnClickOutside } from '@psdhub/common/hooks'
import { Box } from '@psdhub/common/components'

import syncPropsContext from './utils/syncPropsContext'
import { SelectProps, TreeNode, SelectRefProps } from './types'
import { Container } from './styles'
import useConnectRefToContext from './hooks/useConnectRefToContext'
import SelectContext from './context'
import options from './components/Variants/options'
import { Icon, Control, ContainerOptions, ClearAll } from './components'

const Select = forwardRef<SelectRefProps, SelectProps>((props, ref) => {
  const { defaultIsOpen } = props

  const context = useContext(SelectContext)

  const containerRef = useRef<HTMLDivElement>(null)

  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen })

  context.onChange = (checked: string[], raw: TreeNode[]) => {
    context.state = { checked, raw }

    props.onChange && props.onChange(checked, raw)
  }

  const Variant = options[props.variant || 'normal']

  context.onClose = onClose

  syncPropsContext(props, context)
  useOnClickOutside(containerRef, onClose, 'click')
  useConnectRefToContext(context, ref)
  return (
    <Container ref={containerRef} className="hub-select-wrapper">
      <Box className="hub-select-header">
        <Box
          role="button"
          className="hub-select-header-title"
          onClick={onToggle}
        >
          <Control focus={isOpen} />
        </Box>
        {props.clearable && <ClearAll />}
        <Icon onClick={onToggle} open={isOpen} />
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
})

export type { SelectRefProps, SelectProps }

export default memo(Select)
