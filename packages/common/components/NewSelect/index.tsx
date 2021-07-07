import React, { useCallback, useRef } from 'react'

import classNames from 'classnames'

import { useDisclosure, useOnClickOutside } from '@psdhub/common/hooks'
import { Box } from '@psdhub/common/components'

import { Container } from './styles'
import Icon from './Icon'
import Control from './Control'
import ContainerOptions from './ContainerOptions'

const NewSelect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { isOpen, onToggle, onClose } = useDisclosure()

  const toggleList = useCallback(() => {
    onToggle()
    console.log('teste')
  }, [onToggle])

  useOnClickOutside(containerRef, onClose, 'click')

  return (
    <Container ref={containerRef} className="hub-wrapper">
      <Box role="button" className="hub-header" onClick={toggleList}>
        <Box className="hub-header-title">
          <Control focus={isOpen} searchable={e => console.log(e)} />
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
          Brasil
        </ContainerOptions>
      )}
    </Container>
  )
}

export default NewSelect
