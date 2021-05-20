import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { useDropzone } from 'react-dropzone'

import { ImageSquare } from '../Icons/index'
import { useTheme } from '../../layout/styles'
import { Box, Text, Image } from '../../components'

export interface DropzoneHandles {
  getFiles(): string[]
}

const DropzoneHub = forwardRef<DropzoneHandles>((_props, ref) => {
  const [preview, setPreview] = useState('')
  const { colors } = useTheme()

  const onDrop = (acceptedFiles: File[]) => {
    setPreview(URL.createObjectURL(acceptedFiles[0]))
  }

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: '.svg',
    onDrop
  })

  console.log({ preview })

  useImperativeHandle(ref, () => {
    return {
      getFiles: () => acceptedFiles.map(file => URL.createObjectURL(file))
    }
  })

  return (
    <Box
      d="flex"
      p="1rem"
      border={`1px solid ${colors.gray[500]}`}
      borderRadius="8px"
      boxSizing="border-box"
      bg={colors.gray[200]}
      {...getRootProps({ className: 'hub-dropzone' })}
    >
      <Box
        mr="1.2rem"
        w="7rem"
        h="7rem"
        backgroundColor={colors.blue[500]}
        borderRadius="8px"
        d="flex"
        justifyContent="center"
      >
        {!preview ? (
          <Box
            as={ImageSquare}
            color="white"
            size="3rem"
            alignSelf="center"
            justifySelf="center"
          />
        ) : (
          <Image src={preview} />
        )}
      </Box>
      <Box w="50%" ml="4" d="flex" flexDir="column">
        {!isDragActive && (
          <>
            <Text>Arraste e solte uma imagem para usar como ícone ou</Text>
            <Text textColor={`${colors.blue[500]}`}>
              busque em seus arquivos
            </Text>
          </>
        )}

        {/* utilizando input html pois o chakra nao recebe as props do dropzone */}
        <input {...getInputProps()} />
        {isDragAccept && <Text>O arquivo é compatível</Text>}
        {isDragReject && (
          <Text
            d="block"
            mt="20px"
            textColor={`${colors.red[500]}`}
            fontWeight="400"
          >
            O ícone deve ter a extensão .svg
          </Text>
        )}
      </Box>
    </Box>
  )
})

export default DropzoneHub
