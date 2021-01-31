import React from 'react'

import classNames from 'classnames'

import Skeleton from '@hub/common/components/Skeleton'
import { Box, Heading, Stack } from '@hub/common/components'

import { Container } from './styles'
const FakeLoadingCard: React.FC = () => {
  return (
    <Container
      className={classNames({
        isCardLoading: true
      })}
      background="white"
      rounded="md"
      overflow="hidden"
      d="flex"
      height="8.5rem"
      minW={['7.25rem', '10.25rem', '10.25rem', '19.25rem']}
      boxShadow="sm"
      _hover={{
        boxShadow: 'dark-lg'
      }}
      style={{ position: 'relative' }}
    >
      <Skeleton
        isLoaded={false}
        startColor="rgba(0, 0, 0, 0.11)"
        endColor="rgba(0, 0, 0, 0.18)"
        fadeDuration={1}
      >
        <Box
          h="100%"
          minWidth={['4.7rem', '5.9375rem']}
          d="flex"
          justifyContent="center"
          alignItems="center"
          pointerEvents="none"
          p="0.625rem"
        ></Box>
      </Skeleton>

      <Box
        data-testid="button"
        as="button"
        className="card-click"
        pointerEvents="none"
        p={['4', '4', '1.1rem']}
        outline="none"
        boxShadow="none"
      >
        <Box
          d="flex"
          textAlign="left"
          alignItems="baseline"
          flexDirection="column"
          h="100%"
          pr="1rem"
        >
          <Stack>
            <Skeleton
              isLoaded={false}
              startColor="rgba(0, 0, 0, 0.11)"
              endColor="rgba(0, 0, 0, 0.15)"
              width="100%"
              fadeDuration={6}
              height="15px"
              mb="10px"
            >
              <Heading
                as="b"
                fontWeight="normal"
                fontSize="1.125rem"
                color="black"
              >
                Lorem Ipsum Dolor Dolor
              </Heading>
            </Skeleton>
            <Skeleton
              isLoaded={false}
              startColor="rgba(0, 0, 0, 0.11)"
              endColor="rgba(0, 0, 0, 0.15)"
              width="90%"
              fadeDuration={4}
              height="15px"
            ></Skeleton>
            <Skeleton
              isLoaded={false}
              startColor="rgba(0, 0, 0, 0.11)"
              fadeDuration={3}
              width="70%"
              height="15px"
              endColor="rgba(0, 0, 0, 0.15)"
            ></Skeleton>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

export default FakeLoadingCard
