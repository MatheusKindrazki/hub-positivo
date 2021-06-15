import React, { useState, useEffect } from 'react'

import { Option } from '~/store/modules/solutions/types'

import { X } from '@psdhub/common/components/Icons'
import { Select } from '@psdhub/common/components/Form'
import { Box, Stack, Text } from '@psdhub/common/components'

import { PropsSelect } from '~/../../../common/components/Select/variants/Secondary'

interface SchoolSelectorProps extends PropsSelect {
  name: string
  placeholder: string
  label: string
  options: Option[]
}

const SchoolSelector: React.FC<SchoolSelectorProps> = ({
  name,
  placeholder,
  label,
  options,
  ...rest
}) => {
  const [selectedSchools, setSelectedSchools] = useState<string[]>([])

  useEffect(() => {
    console.log('schoolSelector mounted')
  }, [selectedSchools])

  return (
    <Box mb="1rem">
      <Select
        variant="secondary"
        name={name}
        placeholder={placeholder}
        label={label}
        options={options}
        {...rest}
        onChange={(e: any) => {
          if (!e) return
          setSelectedSchools(e.map((option: any) => option.label))
        }}
      />
      {!!selectedSchools.length &&
        selectedSchools.map((school, i) => (
          <Stack
            p="1rem"
            backgroundColor="white"
            borderTopRadius="6px"
            key={school}
            w="100%"
            flexWrap="wrap"
            flexDir="row"
            justifyContent="space-between"
            borderBottom={selectedSchools.length > 1 ? 'solid 1px gray' : ''}
          >
            <Text color="gray.600">{school}</Text>
            <Box
              color="gray.500"
              alignSelf="center"
              justifySelf="flex-end"
              as={X}
              onClick={() => {
                const schools = [...selectedSchools]
                schools.splice(i, 1)
                setSelectedSchools(schools)
                console.log({ schools }, { selectedSchools })
              }}
            />
          </Stack>
        ))}
    </Box>
  )
}

export default SchoolSelector
