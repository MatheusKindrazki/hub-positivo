import React from 'react'

import { Gear, EnvelopeOpen } from 'phosphor-react'

import { Box, Button, Tooltip } from '@psdhub/common/components'

interface NotificationHeaderProps {
  title: string
  markAllAsRead: () => void
  goToSettings: () => void
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  title,
  markAllAsRead,
  goToSettings
}) => {
  return (
    <Box
      d="flex"
      justifyContent="space-between"
      w="100%"
      h="56px"
      borderTopRadius="8px"
      backgroundColor="white"
      borderBottom="solid 1px #E5E5E5"
    >
      <Box
        alignSelf="center"
        px="3.5"
        fontWeight="700"
        fontSize="24px"
        color="#3C3C3C"
      >
        {title}
      </Box>
      <Box alignSelf="center">
        <Tooltip
          p="8px"
          fontSize="16px"
          label="Marcar todas como lidas"
          placement="top-start"
        >
          <Button
            mx={['0', '2', '2', '2']}
            data-testid="mark-all-as-read-button"
            variant="unstyled"
            color="blue.500"
            onClick={markAllAsRead}
          >
            <EnvelopeOpen size="1.75rem" weight="bold" />
          </Button>
        </Tooltip>
        <Tooltip
          p="8px"
          fontSize="16px"
          label="Configurações de notificação"
          placement="top-start"
        >
          <Button
            mx={['0', '2', '2', '2']}
            data-testid="settings-button"
            variant="unstyled"
            color="blue.500"
            onClick={goToSettings}
          >
            <Gear size="1.75rem" weight="bold" />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default NotificationHeader