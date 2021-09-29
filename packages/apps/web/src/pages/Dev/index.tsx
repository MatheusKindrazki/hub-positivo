import React, { useRef } from 'react'

import { FormProps } from '@psdhub/common/components/Form'
import { Box } from '@psdhub/common/components'

const DevHub: React.FC = () => {
  const formRef = useRef<FormProps>(null)
  setTimeout(() => {
    formRef.current?.setData({
      ola: [new Date(), new Date()]
    })
  }, 2000)
  return (
    <Box
      w="100%"
      minH="calc(100vh - 90px)"
      d="flex"
      justifyContent="center"
      alignItems="center"
    ></Box>
  )
}

export default DevHub
