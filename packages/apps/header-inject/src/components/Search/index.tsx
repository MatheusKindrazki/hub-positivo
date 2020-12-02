import React, { useCallback, memo } from 'react'

import { MagnifyingGlass } from '@hub/common/components/Icons'

import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  InputProps
} from '@chakra-ui/react'

const Search: React.FC<InputProps> = ({ onChange, ...rest }) => {
  const handleChange = useCallback(
    event => {
      onChange && onChange(event.target.value)
    },
    [onChange]
  )

  return (
    <>
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
          children={<Box as={MagnifyingGlass} size="20px" color="#7A7A7A" />}
        />
        <Input
          {...rest}
          border="none!important"
          height="3rem"
          placeholder="Buscar produto"
          borderRadius="none"
          fontSize="sm"
          borderBottom="1px solid #9e9e9e!important"
          onChange={handleChange}
          _placeholder={{
            color: '#7A7A7A',
            fontSize: '14px',
            fontWeight: 'normal'
          }}
        />
      </InputGroup>
    </>
  )
}

export default memo(Search)
