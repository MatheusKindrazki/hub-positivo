import React from 'react'

import { Select, Stack } from '@psdhub/common/components'

import { useHeader } from '~/components/Header/context'

const Selects: React.FC = () => {
  const { schoolList, roleList, ...func } = useHeader()

  const { setRole, setSchool, defaultValue } = func
  return (
    <Stack space={4}>
      <Select
        variant="normal"
        blurInputOnSelect
        placeholder="Selecione"
        isSearchable
        inputHeight={48}
        value={defaultValue.school}
        options={schoolList}
        onChange={e => {
          setSchool(e as any)
        }}
      />
      <Select
        key={String(defaultValue.role)}
        variant="normal"
        placeholder="Selecione"
        inputHeight={48}
        value={defaultValue.role}
        options={roleList}
        onChange={e => {
          setRole(e as any)
        }}
      />
    </Stack>
  )
}

export default Selects
