import React from 'react'

import { EnvelopeOpen } from '@psdhub/common/components/Icons'
import { Box, Button, Tooltip } from '@psdhub/common/components'

interface NotificationHeaderProps {
  title: string
  markAllAsRead: () => void
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  title,
  markAllAsRead
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
        px="1.3rem"
        fontWeight="700"
        fontSize={['1.1rem', '1.125rem', '1.5rem']}
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
            m="0"
            data-testid="mark-all-as-read-button"
            variant="unstyled"
            color="blue.500"
            onClick={markAllAsRead}
          >
            <EnvelopeOpen size="1.75rem" css={{ margin: 0 }} />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default NotificationHeader
