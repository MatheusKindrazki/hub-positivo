import React from 'react'

import SearchInput from '@psdhub/common/components/Search'
import { Box, Button } from '@psdhub/common/components'

import Welcome from '~/components/Welcome'
import '../../styles'

interface HomeMenuProps {
  userName?: string
  isTourActive: boolean
  handleOpenTour: () => void
  handleSearch: (value: any) => void
}

const HomeMenu: React.FC<HomeMenuProps> = ({
  userName,
  isTourActive,
  handleOpenTour,
  handleSearch
}) => {
  return (
    <Box w="100%">
      <Box
        maxW="1400px"
        pt="7"
        px={['0', '4']}
        margin="0 auto"
        d="flex"
        alignItems={['center', 'flex-start', 'flex-start', 'center']}
        justifyContent={['center', 'center', 'center', 'space-between']}
        flexDirection={['column', 'column', 'column', 'row']}
      >
        <Box
          w={['70vw', '70vw', '70vw', 'auto']}
          alignSelf="flex-start"
          mx={['6', '6', '6', '0']}
          mb="2"
          minW="240px"
        >
          <Welcome name={userName || ''} fontWeight="700" fontSize="32px" />
        </Box>
        <Box
          d="flex"
          w={['100%', '100%', '100%', 'auto']}
          px="5"
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <Button
            mx={[0, 0, 0, 4]}
            mb="4"
            w="100%"
            h="12"
            variant="outline"
            disabled={isTourActive}
            fontSize="1rem"
            fontWeight="500"
            color="blue.500"
            borderColor="blue.500"
            onClick={handleOpenTour}
          >
            FAZER TOUR
          </Button>

          <SearchInput
            w={['90vw', '90vw', '90vw', '308px']}
            placeholder="Buscar solução"
            backgroundColor="white!important"
            onChange={handleSearch}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default HomeMenu
