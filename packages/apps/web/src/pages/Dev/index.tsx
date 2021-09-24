import React, { useRef } from 'react'

import history from '@psdhub/web/src/services/history'
import { FormProps } from '@psdhub/common/components/Form'
import { Heading, Box } from '@psdhub/common/components'

import { NotificationHeader } from '~/components/NotificationHistory/components'
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
    >
      <Box w="100%" maxW="md">
        <Heading fontWeight="normal" fontSize="2xl" textAlign="center" mb="8">
          EasyAuth / Hub Digital
        </Heading>
        <Box>
          <NotificationHeader
            title="Notificações"
            markAllAsRead={() =>
              alert('Todas as mensagens foram marcadas como lidas')
            }
            goToSettings={() => history.push('/')}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default DevHub
