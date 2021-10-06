import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'

import { useDropzone } from 'react-dropzone'

import { FormHelperText } from '@chakra-ui/react'

import { PreviewContainer, Container } from './styles'
import UploadMessage from './components/UploadMessage'
import ImagePreview from './components/ImagePreview'
import { useTheme } from '../../layout/styles'
import { Box } from '../../components'

export interface DropzoneHandlers {
  getFiles(): string | string[] | void
}
export interface DropzoneProps {
  error: string | undefined
  preview?: Preview
}

interface Preview {
  url: string
  fileName: string
}
export interface Icon {
  url: string
  name: string
}
const DropzoneHub = forwardRef<DropzoneHandlers, DropzoneProps>(
  ({ preview, error }, ref) => {
    const [icon, setIcon] = useState<Icon>()
    const { colors } = useTheme()

    const { url, fileName } = preview as Preview

    useEffect(() => {
      if (typeof url === 'string') {
        setIcon({ url: url, name: `${fileName}.svg` })
      }
    }, [url, fileName])

    const onDrop = useCallback((files: File[]) => {
      if (files.length) {
        setIcon({
          url: URL.createObjectURL(files[0]),
          name: files[0].name
        })
      }
    }, [])

    const {
      acceptedFiles,
      getRootProps,
      getInputProps,
      isDragReject,
      isDragActive,
      isDragAccept
    } = useDropzone({
      accept: 'image/svg+xml',
      onDrop
    })

    const resetIcon = useCallback(() => {
      acceptedFiles.pop()
      setIcon({
        url: '',
        name: ''
      })
    }, [acceptedFiles])

    useImperativeHandle(ref, () => {
      return {
        getFiles: () => {
          if (acceptedFiles.length > 1) {
            return acceptedFiles.map(file => URL.createObjectURL(file))
          }
          if (acceptedFiles.length) {
            return URL.createObjectURL(acceptedFiles[0])
          }
        }
      }
    })

    return (
      <Container
        className={!!preview && 'preview'}
        error={!!error}
        reject={isDragReject}
        colors={colors}
        url={icon?.url as string}
        // desabilita dropzone caso haja uma imagem em tela
        {...(icon?.url ? null : getRootProps({ className: 'hub-dropzone' }))}
      >
        <PreviewContainer colors={colors}>
          <ImagePreview src={icon?.url} />
        </PreviewContainer>
        <Box w="80%" ml="4" d="flex" flexDir="column">
          <UploadMessage
            active={isDragActive}
            reject={!isDragAccept}
            preview={icon as Icon}
            callback={resetIcon}
          />
          <input {...getInputProps()} />
          {error && (
            <FormHelperText
              fontSize="medium"
              data-testid="input-error"
              color="red.300"
            >
              {error}
            </FormHelperText>
          )}
        </Box>
      </Container>
    )
  }
)

export default DropzoneHub
