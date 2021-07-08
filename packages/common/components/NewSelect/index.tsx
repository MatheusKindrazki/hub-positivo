import React, { useCallback, useRef, useContext, memo } from 'react'

import classNames from 'classnames'

import { useDisclosure, useOnClickOutside } from '@psdhub/common/hooks'
import { Box } from '@psdhub/common/components'

import { SelectProps, TreeNode } from './types'
import { Container } from './styles'
import SelectContext from './context'
import options from './components/Variants/options'
import { Icon, Control, ContainerOptions } from './components'

const NewSelect: React.FC<SelectProps<'normal'>> = props => {
  const context = useContext(SelectContext)

  const containerRef = useRef<HTMLDivElement>(null)

  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: true })

  const toggleList = useCallback(() => {
    onToggle()
  }, [onToggle])

  context.onClose = onClose

  context.onChange = (checked: string[], raw: TreeNode[]) => {
    context.state = { checked, raw }
  }

  useOnClickOutside(containerRef, onClose, 'click')

  const Variant = options[props.variant || 'normal']

  return (
    <Container ref={containerRef} className="hub-wrapper">
      <Box role="button" className="hub-header" onClick={toggleList}>
        <Box className="hub-header-title">
          <Control focus={isOpen} />
        </Box>
        <Icon open={isOpen} />
      </Box>
      {isOpen && (
        <ContainerOptions
          className={classNames({
            'header-list': true,
            searchable: true
          })}
        >
          <Variant />
        </ContainerOptions>
      )}
    </Container>
  )
}

export default memo(NewSelect)
