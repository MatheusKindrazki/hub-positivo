import React, { useCallback } from 'react'

import classNames from 'classnames'

import { useDisclosure } from '@psdhub/common/hooks'
import { Box } from '@psdhub/common/components'

import { Container } from './styles'
import Control from './Control'

const NewSelect: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure()

  const toggleList = useCallback(() => {
    onToggle()
    console.log('teste')
  }, [onToggle])

  return (
    <Container className="hub-wrapper">
      <Box role="button" className="hub-header" onClick={toggleList}>
        <Box as="p" className="hub-header-title">
          <Control focus={isOpen} searchable={e => console.log(e)} />
        </Box>
        <Box>Icone</Box>
      </Box>
      {isOpen && (
        <Box
          className={classNames({
            'header-list': true,
            searchable: true
          })}
        >
          Brasil
        </Box>
      )}
    </Container>
  )
}

export default NewSelect
