import React, { useCallback, useEffect, useState } from 'react'

import Dropzone, { DropzoneRef } from 'react-dropzone'

import FakeProgress from './components/FakeProgress'
import FakeLoaded from './components/FakeLoaded'
import { ImageSquare } from '../Icons/index'
import { useTheme } from '../../layout/styles'
import { Box, Text, Button } from '../../components'

const DropzoneHub = React.forwardRef<DropzoneRef>((_props, ref) => {
  const { colors } = useTheme()
  const [uploadInProgess, setUploadInProgress] = useState(false)
  const [fileLoaded, setFileLoaded] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    console.log('rendered dropzone')
  }, [uploadInProgess])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('uploading file', acceptedFiles)
    setFile(acceptedFiles[0])
    setUploadInProgress(true)
    setTimeout(() => {
      setUploadInProgress(false)
      setFileLoaded(true)
    }, 3000)
  }, [])

  return (
    <Dropzone onDrop={onDrop} ref={ref}>
      {({ getRootProps, getInputProps }) => (
        <Box
          d="flex"
          p="1rem"
          border={
            fileLoaded || uploadInProgess
              ? `1px solid ${colors.gray[500]}`
              : `2px dashed ${colors.gray[100]}`
          }
          borderRadius="8px"
          boxSizing="border-box"
          bg={fileLoaded || uploadInProgess ? 'white' : `${colors.gray[200]}`}
        >
          <Box
            mr="1.2rem"
            w="7rem"
            h="7rem"
            backgroundColor={fileLoaded ? colors.blue[500] : colors.gray[100]}
            borderRadius="8px"
            {...getRootProps({ className: 'dropzone' })}
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
            {fileLoaded ? (
              <FakeLoaded filename={file?.name} width="34rem" />
            ) : uploadInProgess ? (
              <FakeProgress filename={file?.name} width="34rem" />
            ) : (
              <>
                <Text fontWeight="400" fontSize="1.1rem">
                  Arraste e solte uma imagem para usar como ícone ou
                </Text>
                <Box>
                  <Text
                    cursor="grab"
                    textColor={`${colors.blue[500]}`}
                    fontWeight="400"
                    fontSize="1.1rem"
                    {...getRootProps({ className: 'dropzone' })}
                  >
                    busque em seus arquivos
                  </Text>
                  {/* utilizando input html pois o chakra nao recebe as props do dropzone */}
                  <input {...getInputProps()} />
                </Box>
              </>
            )}
            <Box d="flex" width="34rem" flexDir="row-reverse" height="1rem">
              {fileLoaded ? (
                <Button
                  onClick={() => {
                    setFileLoaded(false)
                    setFile(null)
                  }}
                  alignSelf="flex-end"
                  variant="unstyled"
                  maxWidth="8rem"
                  textColor={`${colors.gray[500]}`}
                  fontWeight={400}
                >
                  Excluir
                </Button>
              ) : null}
            </Box>
          </Box>
        </Box>
      )}
    </Dropzone>
  )
})

export default DropzoneHub
