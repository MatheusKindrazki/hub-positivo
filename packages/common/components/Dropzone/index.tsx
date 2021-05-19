import React, { forwardRef, useImperativeHandle } from 'react'

import { useDropzone } from 'react-dropzone'

import { ImageSquare } from '../Icons/index'
import { useTheme } from '../../layout/styles'
import { Box, Text, Button } from '../../components'

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
      // border={
      //   fileLoaded || uploadInProgress
      //     ? `1px solid ${colors.gray[500]}`
      //     : `2px dashed ${colors.gray[100]}`
      // }
      borderRadius="8px"
      boxSizing="border-box"
      // bg={fileLoaded || uploadInProgress ? 'white' : `${colors.gray[200]}`}
      {...getRootProps({ className: 'hub-dropzone' })}
    >
      <Box
        mr="1.2rem"
        w="7rem"
        h="7rem"
        // backgroundColor={fileLoaded ? colors.blue[500] : colors.gray[100]}
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
        <Box>
          <Text
            cursor="grab"
            textColor={`${colors.blue[500]}`}
            fontWeight="400"
            fontSize="1.1rem"
          >
            busque em seus arquivos
          </Text>
          {/* utilizando input html pois o chakra nao recebe as props do dropzone */}
          <input {...getInputProps()} />
        </Box>

        <Box d="flex" width="34rem" flexDir="row-reverse" height="1rem">
          <Button
            alignSelf="flex-end"
            variant="unstyled"
            maxWidth="8rem"
            textColor={`${colors.gray[500]}`}
            fontWeight={400}
          >
            Excluir
          </Button>
        </Box>
      </Box>
    </Box>
  )
})

export default DropzoneHub
