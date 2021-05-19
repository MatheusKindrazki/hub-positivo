import React, { forwardRef, useImperativeHandle } from 'react'

import { useDropzone } from 'react-dropzone'

import { ImageSquare } from '../Icons/index'
import { useTheme } from '../../layout/styles'
import { Box, Text } from '../../components'

export interface DropzoneHandles {
  getFiles(): File[]
}

const DropzoneHub = forwardRef<DropzoneHandles>((_props, ref) => {
  const { colors } = useTheme()

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  useImperativeHandle(ref, () => {
    return {
      getFiles: () => acceptedFiles
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
        <Box
          as={ImageSquare}
          color="white"
          size="3rem"
          alignSelf="center"
          justifySelf="center"
        />
      </Box>
      <Box
        w="14rem"
        ml="1rem"
        d="flex"
        flexDir="column"
        justifyContent="space-around"
      >
        <Text fontWeight="400" fontSize="1.1rem">
          Arraste e solte uma imagem para usar como ícone ou
        </Text>
        <Text
          cursor="grab"
          textColor={`${colors.blue[500]}`}
          fontWeight="400"
          fontSize="1.1rem"
        >
          busque em seus arquivos
        </Text>
        <Box>
          {/* utilizando input html pois o chakra nao recebe as props do dropzone */}
          <input ref={ref} {...getInputProps()} />
        </Box>
      </Box>
    </Box>
  )
})

export default DropzoneHub
