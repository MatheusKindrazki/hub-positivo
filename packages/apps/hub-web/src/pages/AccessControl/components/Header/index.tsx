import React from 'react'

import { useHistory } from 'react-router'

import { Stack, Button, Box } from '@psdhub/common/components'

import OptionButton from './components/OptionButton'

const Header: React.FC = () => {
  const { location, push } = useHistory()

  return (
    <>
      <Stack direction={['column', 'column', 'row']} spacing="auto" m="2">
        <Box>
          <Button
            variant="unstyled"
            m="1"
            p="3"
            color="blue.500"
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
            color="blue.500"
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
