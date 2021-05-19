import React, { useRef, useEffect } from 'react'

import { useField } from '@unform/core'

import { FormControl, FormLabel } from '@chakra-ui/react'

import DropzoneHub, { DropzoneHandles } from '../../Dropzone'

interface Props {
  name: string
  label?: string
}

const Dropzone: React.FC<Props> = ({ name, label }) => {
  const dropRef = useRef<DropzoneHandles>(null)

  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: dropRef.current,
      getValue: () => dropRef.current?.getFiles()
    })
  }, [fieldName, registerField])

  return (
    <FormControl>
      {label && (
        <FormLabel color="blue.500" fontWeight="400">
          {label}
        </FormLabel>
      )}
      <DropzoneHub ref={dropRef} />
    </FormControl>
  )
}

export default Dropzone
