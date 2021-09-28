import React from 'react'

import SearchInput from '@psdhub/common/components/Search'
import { Box, Button } from '@psdhub/common/components'

import Welcome from '~/components/Welcome'

import '../../styles'

interface HomeMenuProps {
  userInfo: { name?: string | null; profile: string }
  isTourActive: boolean
  handleOpenTour: () => void
  handleSearch: (value: any) => void
  handleCreateSolution: () => void
}

const HomeMenu: React.FC<HomeMenuProps> = ({
  userInfo,
  isTourActive,
  handleOpenTour,
  handleSearch,
  handleCreateSolution
}) => {
  const { name, profile } = userInfo
  return (
    <Box w="100%">
      <Box
        maxW="1400px"
        pt="7"
        px={['0', '2']}
        margin="0 auto"
        d="flex"
        alignItems={['center', 'flex-start', 'flex-start', 'center']}
        justifyContent={['center', 'center', 'center', 'space-between']}
        flexDirection={['column', 'column', 'column', 'row']}
      >
        <Box
          alignSelf={['flex-start', 'flex-start', 'flex-start', 'center']}
          pb="3"
          w={['70vw', '70vw', '70vw', 'auto']}
          mx={['6', '6', '6', '0']}
          minW="240px"
        >
          <Welcome name={name || ''} fontWeight="700" fontSize="32px" />
        </Box>
        <Box
          justifyContent={[
            'flex-start',
            'flex-start',
            'flex-start',
            'flex-end'
          ]}
          d="flex"
          w={['100%', '100%', '100%', '60%']}
          px={['5', '5', '5', '1']}
          flexDirection={['column', 'column', 'column', 'row']}
        >
          {profile === 'Administrador' && (
            <Button
              mx={[0, 0, 0, 0]}
              mb="4"
              w={['90vw', '90vw', '95vw', 'auto']}
              h="12"
              p="4"
              variant="outline"
              borderWidth="2"
              fontSize="1rem"
              fontWeight="500"
              color="blue.500"
              borderColor="blue.500"
              onClick={handleCreateSolution}
            >
              ADICIONAR SOLUÇÃO
            </Button>
          )}
          <Button
            mx={[0, 0, 0, 4]}
            mb="4"
            w={['90vw', '90vw', '95vw', 'auto']}
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
          <Box w={['90vw', '90vw', '95vw', 'auto']}>
            <SearchInput
              placeholder="Buscar solução"
              backgroundColor="white!important"
              onChange={handleSearch}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default HomeMenu
