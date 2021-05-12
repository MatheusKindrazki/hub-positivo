import React, { useCallback, useState } from 'react'

import { useDisclosure } from '@psdhub/common/hooks'
import Welcome from '@psdhub/common/components/Welcome'
import Popover, {
  PopoverTrigger,
  PopoverContent
} from '@psdhub/common/components/Popover'
import { MenuDivider } from '@psdhub/common/components/Menu'
import { Box, Button, Avatar, Select } from '@psdhub/common/components'

import { useHeader } from './context'

const DesktopMenu: React.FC = () => {
  const [enableBlur, setEnableBlur] = useState(true)
  const { schoolList, roleList, userName, signOut, ...func } = useHeader()

  const { setRole, setSchool, resetInfo, defaultValue } = func

  const { isOpen, onOpen: menuOpen, onClose: menuClose } = useDisclosure()

  const handleClosed = useCallback(() => {
    menuClose()
    resetInfo()
  }, [menuClose, resetInfo])

  return (
    <Box
      className="hub-logo"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Popover
        onClose={handleClosed}
        onOpen={menuOpen}
        isOpen={isOpen}
        closeOnBlur={enableBlur}
        isLazy
      >
        <PopoverTrigger>
          <Button p="0" m="0" background="transparent">
            <Avatar
              data-testid="hub-popover-trigger"
              cursor="pointer"
              width="2.6rem"
              color="#3C3C3C"
              height="2.5rem"
              backgroundColor="gray.400"
              name={userName}
              src=""
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          data-testid="hub-popover-content"
          outline="none"
          minW="310px"
          opacity={isOpen ? 1 : '0!important'}
          borderRadius="md"
          boxShadow="dark-lg"
          border="1px solid #D9D9D9"
          mr="2rem!important"
          _focus={{
            boxShadow: 'dark-lg'
          }}
        >
          <Box px="4" py="2" w="100%" h="auto">
            <Welcome
              name={userName}
              avatar=""
              option="name"
              fontSize="1rem"
              size="48px"
              fontWeight="bold"
            />
          </Box>
          <MenuDivider />
          <Box px="4" pt="3" pb="3">
            <Select
              variant="normal"
              blurInputOnSelect
              placeholder="Selecione"
              isSearchable
              inputHeight={40}
              value={defaultValue.school}
              options={schoolList}
              onFocus={() => setEnableBlur(false)}
              onBlur={() => setEnableBlur(true)}
              onChange={e => {
                setSchool(e as any)
              }}
            />
          </Box>
          <Box px="4" pb="3">
            <Select
              key={String(defaultValue.role)}
              variant="normal"
              placeholder="Selecione"
              inputHeight={40}
              value={defaultValue.role}
              options={roleList}
              onFocus={() => setEnableBlur(false)}
              onBlur={() => setEnableBlur(true)}
              onChange={e => {
                setEnableBlur(true)
                setRole(e as any)
              }}
            />
          </Box>
          <MenuDivider />
          <Box px="3" py="3">
            <Button
              variant="link"
              color="gray.500"
              fontSize="0.875rem"
              onClick={signOut}
            >
              Sair
            </Button>
          </Box>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default DesktopMenu
