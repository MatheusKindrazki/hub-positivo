import React, { useCallback, memo } from 'react'

import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  InputProps
} from '@chakra-ui/react'

import { MagnifyingGlass } from '../Icons'

const Search: React.FC<InputProps> = ({ onChange, ...rest }) => {
  const handleChange = useCallback(
    event => {
      onChange && onChange(event.target.value)
    },
    [onChange]
  )

  return (
    <Box>
      <InputGroup height="3rem">
        <Input
          {...rest}
          borderColor="#C4C4C4!important"
          height="3rem"
          placeholder="Buscar soluções"
          borderRadius="md"
          onChange={handleChange}
          _placeholder={{
            color: '#7A7A7A',
            fontSize: '14px'
          }}
        />
        <InputRightElement
          width="3rem"
          height="3rem"
          zIndex={1}
          children={
            <Box as={MagnifyingGlass} size="30px" zIndex={1} color="blue.500" />
          }
        />
      </InputGroup>
    </Box>
  )
}

export default memo(Search)

export type SearchProps = InputProps
