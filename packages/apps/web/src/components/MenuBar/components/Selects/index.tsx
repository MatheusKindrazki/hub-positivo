import React from 'react'

import { Select, Stack } from '@psdhub/common/components'

import { useHeader } from '../../context'

type SelectsProps = { closeMenu: () => void }

const Selects: React.FC<SelectsProps> = ({ closeMenu }) => {
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
          setTimeout(() => closeMenu(), 500)
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
          setTimeout(() => closeMenu(), 500)
        }}
      />
    </Stack>
  )
}

export default Selects
