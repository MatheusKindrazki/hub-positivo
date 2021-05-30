import React, { useRef, useEffect } from 'react'

import { useField } from '@unform/core'

import { FormControl, FormLabel } from '@chakra-ui/react'

import DropzoneHub, { DropzoneHandlers } from '../../Dropzone'

interface Props {
  name: string
  label?: string
  preview?: {
    url: string
    fileName: string
  }
}

const Dropzone: React.FC<Props> = ({ name, label, preview }) => {
  const dropRef = useRef<DropzoneHandlers>(null)

  const { fieldName, registerField, error } = useField(name)

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
      <DropzoneHub ref={dropRef} preview={preview} error={error} />
    </FormControl>
  )
}

export default Dropzone
