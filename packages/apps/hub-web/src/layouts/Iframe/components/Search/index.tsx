import React, { memo } from 'react'

import { debounce } from 'ts-debounce'

import { MagnifyingGlass } from '@hub/common/components/Icons'

import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  InputProps
} from '@chakra-ui/react'

interface HandleChange extends InputProps {
  handleChange: (e: string) => void
}

const Search: React.FC<HandleChange> = ({ handleChange, ...rest }) => {
  const handleInput = debounce(event => {
    handleChange(event.target.value)
  }, 500)

  return (
    <Box zIndex="999999">
      <InputGroup
        backgroundColor="gray.200"
        height="3rem"
        position="absolute"
        top="0"
        left="0"
        w="100%"
      >
        <InputLeftElement
          width="3rem"
          height="3rem"
          zIndex="99999999"
          children={<Box as={MagnifyingGlass} size="20px" color="#7A7A7A" />}
        />
        <Input
          border="none!important"
          height="3rem"
          placeholder="Buscar soluções"
          borderRadius="none"
          fontSize="sm"
          borderBottom="1px solid #9e9e9e!important"
          onChange={e => {
            handleInput(e)
          }}
          _placeholder={{
            color: '#7A7A7A',
            fontSize: '14px',
            fontWeight: 'normal'
          }}
          {...rest}
        />
      </InputGroup>
    </Box>
  )
}

export default memo(Search)
