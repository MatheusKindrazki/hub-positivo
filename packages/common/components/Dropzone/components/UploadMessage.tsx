import React from 'react'

import { Text, Stack } from '@psdhub/common/components'

import { PreviewObject } from '..'

interface UploadMessageProps {
  active: boolean
  reject: boolean
  callback: () => void
  preview?: PreviewObject
}

const UploadMessage: React.FC<UploadMessageProps> = ({
  active,
  reject,
  preview,
  callback
}) => {
  return active ? (
    reject && (
      <Text d="block" mt="20px" textColor="red.500" fontWeight="400">
        A imagem deve ter o formato SVG!
      </Text>
    )
  ) : !preview?.url ? (
    <Stack>
      <Text w="40%">
        Arraste e solte uma imagem para usar como ícone ou
        <Text textColor="blue.500">busque em seus arquivos</Text>
      </Text>
    </Stack>
  ) : (
    preview?.url && (
      <Stack mt="12" w="100%" flexDir="row" justifyContent="space-between">
        {preview?.name && <Text>{preview?.name}</Text>}
        <Text
          cursor="pointer"
          w="14"
          onClick={callback}
          fontWeight="400"
          textColor="blue.500"
        >
          Excluir
        </Text>
      </Stack>
    )
  )
}

export default UploadMessage
