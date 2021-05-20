import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'

import { useDropzone } from 'react-dropzone'

import { PreviewContainer, Container } from './styles'
import UploadMessage from './components/UploadMessage'
import ImagePreview from './components/ImagePreview'
import { useTheme } from '../../layout/styles'
import { Box } from '../../components'

export interface DropzoneHandlers {
  getFiles(): string[]
}
export interface DropzoneProps {
  previewUrl: string
}

export interface PreviewObject {
  url: string
  name: string
  size: number
}
const DropzoneHub = forwardRef<DropzoneHandlers, DropzoneProps>(
  ({ previewUrl }, ref) => {
    const [preview, setPreview] = useState<PreviewObject>()
    const { colors } = useTheme()

    useEffect(() => {
      if (previewUrl) {
        setPreview({
          url: previewUrl,
          name: '',
          size: 0
        })
      }
    }, [previewUrl])

    const onDrop = useCallback((acceptedFiles: File[]) => {
      setPreview({
        url: URL.createObjectURL(acceptedFiles[0]),
        name: acceptedFiles[0].name,
        size: acceptedFiles[0].size
      })
    }, [])

    const resetIcon = useCallback(() => {
      setPreview({
        url: '',
        name: '',
        size: 0
      })
    }, [])

    const {
      acceptedFiles,
      getRootProps,
      getInputProps,
      isDragReject,
      isDragActive
    } = useDropzone({
      accept: '.svg',
      onDrop
    })

    useImperativeHandle(ref, () => {
      return {
        getFiles: () => acceptedFiles.map(file => URL.createObjectURL(file))
      }
    })

    return (
      <Container
        reject={isDragReject}
        colors={colors}
        previewUrl={preview?.url as string}
        // desabilita dropzone caso ja tenha uma imagem em tela
        {...(preview?.url ? null : getRootProps({ className: 'hub-dropzone' }))}
      >
        <PreviewContainer colors={colors}>
          <ImagePreview src={preview?.url} />
        </PreviewContainer>
        <Box w="80%" ml="4" d="flex" flexDir="column">
          <UploadMessage
            active={isDragActive}
            reject={isDragReject}
            preview={preview as PreviewObject}
            callback={resetIcon}
          />
          <input {...getInputProps()} />
        </Box>
      </Container>
    )
  }
)

export default DropzoneHub
