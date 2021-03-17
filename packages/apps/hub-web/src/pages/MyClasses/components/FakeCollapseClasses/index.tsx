import React, { useMemo } from 'react'

import { Collapse as CollapseUI } from 'react-collapse'
import classNames from 'classnames'

import { useMediaQuery } from '@hub/common/hooks'
import Skeleton from '@hub/common/components/Skeleton'
import { Box, Heading, SimpleGrid } from '@hub/common/components'

import CollapseGlobal from './styles'

export interface ClassesCollapseProps {
  id: string
  gridColumns?: number | number[]
  className?: string
  grid?: boolean
}

const ClassesCollapse: React.FC<ClassesCollapseProps> = ({
  id,
  children,
  gridColumns,
  grid = true,
  className
}) => {
  const [isDesktopClassesLarge] = useMediaQuery('(min-width: 1300px)')

  const responsiveGridClasses = useMemo(() => {
    return isDesktopClassesLarge ? 4 : 3
  }, [isDesktopClassesLarge])

  return (
    <>
      <Box
        mt="8"
        key={id}
        width="100%"
        className={classNames(className, { 'collapse-home': true })}
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
              columns={gridColumns || [1, 1, 2, responsiveGridClasses]}
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

export default ClassesCollapse
