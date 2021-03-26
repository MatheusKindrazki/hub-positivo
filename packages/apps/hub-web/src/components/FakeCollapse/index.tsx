import React, { useMemo } from 'react'

import { Collapse as CollapseUI } from 'react-collapse'
import classNames from 'classnames'

import { useMediaQuery } from '@hub/common/hooks'
import Skeleton from '@hub/common/components/Skeleton'
import { Box, Heading, SimpleGrid } from '@hub/common/components'

import CollapseGlobal from './styles'

export interface CollapseProps {
  id: string
  gridColumns?: number | number[]
  className?: string
  grid?: boolean
}

const HomeCollapse: React.FC<CollapseProps> = ({
  id,
  children,
  gridColumns,
  grid = true,
  className
}) => {
  const [isDeskLarge] = useMediaQuery('(min-width: 1300px)')

  const responsiveGridLarge = useMemo(() => {
    return isDeskLarge ? 4 : 3
  }, [isDeskLarge])

  return (
    <>
      <Box
        mt="8"
        key={id}
        width="100%"
        className={classNames(className, { collapse: true })}
      >
        <Box
          width="100%"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton
            height="19px"
            startColor="rgba(0, 0, 0, 0.11)"
            endColor="rgba(0, 0, 0, 0.12)"
          >
            <Heading
              as="h6"
              color="blue.500"
              fontWeight="normal"
              fontSize="1.5rem"
              className="background-animate"
            >
              Lorem Ipsum Ipsum
            </Heading>
          </Skeleton>
        </Box>
        <CollapseUI isOpened style={{ padding: '10px 0' }}>
          {grid ? (
            <SimpleGrid
              data-testid="simple-grid"
              columns={gridColumns || [1, 1, 2, responsiveGridLarge]}
              spacing={4}
              mt="4"
            >
              {children}
            </SimpleGrid>
          ) : (
            <>{children}</>
          )}
        </CollapseUI>
      </Box>
      <CollapseGlobal />
    </>
  )
}

export default HomeCollapse
