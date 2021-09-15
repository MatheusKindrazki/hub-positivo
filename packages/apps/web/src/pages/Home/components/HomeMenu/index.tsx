import React from 'react'

import SearchInput from '@psdhub/common/components/Search'
import { Box, Welcome, Button } from '@psdhub/common/components'

import Filter from '../Filter'

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
    <Box
      maxW="1400px"
      py="6"
      px={['0', '4']}
      margin="0 auto"
      d="flex"
      alignItems={['center', 'flex-start', 'flex-start', 'center']}
      flexDirection={['column', 'column', 'column', 'row']}
    >
      <Welcome name={userName || ''} fontWeight="700" fontSize="32px" />
      <Box ml="auto" d="flex">
        <Button
          h="12"
          variant="outline"
          disabled={isTourActive}
          fontSize="1rem"
          fontWeight="500"
          color="blue.500"
          borderColor="blue.500"
          onClick={handleOpenTour}
          mx="1"
        >
          FAZER TOUR
        </Button>
        <Box maxW={['308px']} mt={['5', '5', '5', '0']}>
          <SearchInput
            placeholder="Buscar soluções"
            backgroundColor="white!important"
            onChange={handleSearch}
          />
          <Filter />
        </Box>
      </Box>
    </Box>
  )
}

export default HomeMenu
