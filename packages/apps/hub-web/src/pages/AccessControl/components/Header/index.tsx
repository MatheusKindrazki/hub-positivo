import React from 'react'

import { useHistory } from 'react-router'

import { Stack, Button, Box } from '@psdhub/common/components'

import { useColorByLocation } from '~/hooks/useColorByLocation'

import OptionButton from './components/OptionButton'
const Header: React.FC = () => {
  const { location, push } = useHistory()
  const { color } = useColorByLocation()
  const { accessControl } = color()

  return (
    <>
      <Stack direction={['column', 'column', 'row']} spacing="auto" m="2">
        <Box>
          <Button
            variant="unstyled"
            m="1"
            p="3"
            pb="8"
            fontWeight="500"
            textColor={accessControl.home}
            borderBottomWidth="0.1875rem"
            borderBottomRadius="none"
            borderColor={
              location.pathname === '/controle-de-acessos'
                ? 'blue.500'
                : 'transparent'
            }
            onClick={() => push('/controle-de-acessos')}
          >
            SOLUÇÕES
          </Button>
          <Button
            m="1"
            variant="unstyled"
            p="3"
            pb="8"
            fontWeight="500"
            textColor={accessControl.trash}
            borderBottomWidth="0.1875rem"
            borderBottomRadius="none"
            borderColor={
              location.pathname === '/controle-de-acessos/lixeira'
                ? 'blue.500'
                : 'transparent'
            }
            onClick={() => push('/controle-de-acessos/lixeira')}
          >
            LIXEIRA
          </Button>
        </Box>
        {location.pathname === '/controle-de-acessos' && <OptionButton />}
      </Stack>
    </>
  )
}

export default Header
