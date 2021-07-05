import React, { useCallback } from 'react'

import classNames from 'classnames'

import { useDisclosure } from '@psdhub/common/hooks'
import { Box, Button } from '@psdhub/common/components'

import Control from './Control'

const NewSelect: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure()

  const toggleList = useCallback(() => {
    onToggle()
    console.log('teste')
  }, [onToggle])

  return (
    <Box className="hub-wrapper">
      <Button type="button" className="hub-header" onClick={toggleList}>
        <Box as="p" className="hub-header-title">
          <Control searchable={e => console.log(e)} />
        </Box>
        <Box>Icone</Box>
      </Button>
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
    </Box>
  )
}

export default NewSelect
