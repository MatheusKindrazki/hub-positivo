import React, { useState, forwardRef, useImperativeHandle } from 'react'

import { Option } from '~/store/modules/solutions/types'

import { X } from '@psdhub/common/components/Icons'
import { Box, Stack, Text } from '@psdhub/common/components'

export interface SchoolListHandler {
  setValue: (value: Option[]) => void
}

export interface SchoolListProps {
  onDelete: (value: Option[]) => void
}

const SchoolList = forwardRef<SchoolListHandler, SchoolListProps>(
  ({ onDelete }, ref) => {
    const [selectedSchools, setSelectedSchools] = useState<Option[]>([])

    const setValue = (value: Option[]) => {
      setSelectedSchools(value)
    }

    useImperativeHandle(ref, () => {
      return {
        setValue
      }
    })

    return (
      <Box mb="1rem" borderTopRadius="6px" borderBottomRadius="6px">
        {!!selectedSchools.length &&
          selectedSchools.map((school, i) => (
            <Stack
              p="1rem"
              backgroundColor="white"
              key={school.label}
              w="100%"
              flexWrap="wrap"
              flexDir="row"
              justifyContent="space-between"
              borderBottom="solid 1px gray"
            >
              <Text color="gray.600">{school.label}</Text>
              <Box
                color="gray.500"
                alignSelf="center"
                justifySelf="flex-end"
                as={X}
                onClick={() => {
                  const schools = [...selectedSchools]
                  schools.splice(i, 1)
                  setSelectedSchools(schools)
                  onDelete(schools)
                }}
              />
            </Stack>
          ))}
      </Box>
    )
  }
)

export default SchoolList
