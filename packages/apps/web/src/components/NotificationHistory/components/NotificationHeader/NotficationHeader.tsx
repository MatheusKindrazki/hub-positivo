import React from 'react'

import { Gear, EnvelopeOpen } from 'phosphor-react'

import { Box, Button } from '@psdhub/common/components'

interface NotificationHeader {
  title: string
  markAllAsRead: () => void
  goToSettings: () => void
}

const NotficationHeader: React.FC<NotificationHeader> = ({
  title,
  markAllAsRead,
  goToSettings
}) => {
  return (
    <Box
      d="flex"
      w="100%"
      h="56px"
      justifyContent="space-between"
      borderTopRadius="8px"
      backgroundColor="white"
      border="solid 1px #E5E5E5"
    >
      <Box
        alignSelf="center"
        pl="4"
        fontWeight="700"
        fontSize="24px"
        color="#3C3C3C"
      >
        {title}
      </Box>
      <Box d="flex" flexDir="row" alignSelf="center">
        <Button variant="ghost" color="blue.500" onClick={markAllAsRead}>
          <EnvelopeOpen size="1.75rem" weight="bold" />
        </Button>
        <Button variant="ghost" color="blue.500" onClick={goToSettings}>
          <Gear size="1.75rem" weight="bold" />
        </Button>
      </Box>
    </Box>
  )
}

export default NotficationHeader
