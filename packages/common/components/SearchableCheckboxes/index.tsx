import React, { useEffect, useState } from 'react'

import { debounce } from 'ts-debounce'

import { CheckboxGroup } from '@chakra-ui/checkbox'

import Search from '../Search'
import Divider from '../Divider'
import Checkbox from '../Checkbox'
import { BoxProps } from '../Box'
import { Box, Button, Stack } from '../'

interface Option {
  value: string
  label: string
}

interface SearchableSelectProps extends BoxProps {
  options: Option[] | undefined
  onChange: (e: any) => void
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  onChange,
  ...rest
}) => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log(search)
  }, [search])

  const handleSearchInput = debounce(text => {
    setSearch(text)
  }, 300)

  const filteredData = (data: Option[]) => {
    const res = data.filter(data =>
      data.label.toLowerCase().includes(search.toLowerCase())
    )
    return res
  }

  return (
    <Box bg="white" borderRadius="8px" {...rest}>
      <Search
        mb="2"
        borderRadius="0px"
        roundedBottom="unset"
        onChange={e => handleSearchInput(e)}
      />
      <Stack p="2" h="52" overflow="scroll">
        <CheckboxGroup>
          {options &&
            filteredData(options)?.map(option => (
              <Checkbox size="lg" key={option.label} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
        </CheckboxGroup>
      </Stack>
      <Divider />
      <Stack
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
        overflow="hidden"
      >
        <Button
          borderRadius="0"
          variant="ghost"
          fontWeight="500"
          textTransform="uppercase"
          textColor="blue.500"
        >
          Cancelar
        </Button>
        <Divider orientation="vertical" size="lg" />
        <Button
          borderRadius="0"
          variant="ghost"
          fontWeight="500"
          textTransform="uppercase"
          textColor="blue.500"
          onClick={onChange}
        >
          Aplicar
        </Button>
      </Stack>
    </Box>
  )
}

export default SearchableSelect
