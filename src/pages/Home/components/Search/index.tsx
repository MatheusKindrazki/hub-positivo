import React, { useCallback } from 'react';

import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
} from '@chakra-ui/core';

interface SearchProps {
  onChange: (e: string) => void;
}

const Search: React.FC<SearchProps> = ({ onChange }) => {
  const handleChange = useCallback(
    event => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <Box>
      <InputGroup height="3rem">
        <Input
          borderColor="#C4C4C4!important"
          height="3rem"
          placeholder="Buscar produto"
          borderRadius="md"
          onChange={handleChange}
          _placeholder={{
            color: '#7A7A7A',
            fontSize: '14px',
          }}
        />
        <InputRightElement
          height="3rem"
          children={<Icon name="search" color="blue.500" />}
        />
      </InputGroup>
    </Box>
  );
};

export default Search;
