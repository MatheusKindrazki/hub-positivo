import React from 'react'

import classNames from 'classnames'

import { documentTitle } from '@hub/common/utils'
import SearchInput from '@hub/common/components/Search'
import { Heading, Box, Collapse } from '@hub/common/components'

const MyClasses: React.FC = () => {
  documentTitle('Minhas Turmas')

  return (
    <>
      <Box
        maxW="1400px"
        px={['0', '4']}
        margin="0 auto"
        mt="32px"
        d="flex"
        justifyContent="space-between"
        alignItems={['center', 'flex-start', 'flex-start', 'center']}
        flexDirection={['column', 'column', 'column', 'row']}
      >
        <Box width="100%">
          <Heading fontSize="1.875rem" fontWeight="normal">
            Minhas Turmas
          </Heading>
          <Box py={['0.75rem', '1.75rem']}>
            <SearchInput
              placeholder="Buscar alunos"
              backgroundColor="white!important"
              // onChange={handleSearch}
            />
          </Box>
        </Box>
      </Box>
      <Box
        d="flex"
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="space-between"
        maxW="1400px"
        margin="0 auto"
        px={['0', '4']}
      >
        <Collapse
          key={Math.random()}
          cor="blue"
          id="1"
          nome="Brasil"
          className={classNames({
            // isLine: 3 !== 0
            isLine: true
          })}
        ></Collapse>
      </Box>
    </>
  )
}

export default MyClasses
