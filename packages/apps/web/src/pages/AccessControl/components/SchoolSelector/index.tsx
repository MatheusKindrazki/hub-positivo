import React, { useState, useEffect } from 'react'

import { Option } from '~/store/modules/solutions/types'

import { X } from '@psdhub/common/components/Icons'
import { Select } from '@psdhub/common/components/Form'
import { Box, Text } from '@psdhub/common/components'

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

  useEffect(() => {}, [selectedSchools])

  return (
    <>
      <Select
        variant="secondary"
        name={name}
        placeholder={placeholder}
        label={label}
        options={options}
        {...rest}
        onChange={e =>
          setSelectedSchools([...selectedSchools, e?.label as string])
        }
      />
      {selectedSchools.length &&
        selectedSchools.map((school, i) => (
          <Box key={school}>
            <Text>{school}</Text>
            <Box
              as={X}
              onClick={() => setSelectedSchools(selectedSchools.splice(i, 1))}
            />
          </Box>
        ))}
    </>
  )
}

export default SchoolSelector
