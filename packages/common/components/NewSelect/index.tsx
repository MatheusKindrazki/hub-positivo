import React, { useRef, memo } from 'react'

import classNames from 'classnames'

import { useMergeRefs, useDisclosure, forwardRef } from '@psdhub/common/hooks'
import { Box, Text } from '@psdhub/common/components'

import { chakra, ChakraComponent } from '@chakra-ui/react'

export interface NewSelectProps extends ChakraComponent<'div'> {}

const NewSelect = forwardRef<NewSelectProps, 'select'>((props, ref) => {
  const { className } = props

  const selectRef = useRef<HTMLDivElement>(null)
  const refs = useMergeRefs(selectRef, ref)

  const { isOpen, onToggle } = useDisclosure()
  return (
    <Box ref={refs} className={classNames(className, { 'hub-select': true })}>
      <Box
        tabIndex={0}
        className="hub-select-header"
        role="button"
        onKeyPress={onToggle}
        onClick={onToggle}
      >
        <Box className="dd-header__title">
          <Text className="dd-header__title--bold">Select</Text>
        </Box>
        <Box className="dd-header__action">
          <Text>{isOpen ? 'Close' : 'Open'}</Text>
        </Box>
      </Box>
    </Box>
  )
})

export default chakra(memo(NewSelect))
