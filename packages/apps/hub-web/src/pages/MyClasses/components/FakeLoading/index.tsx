import React from 'react'

import classNames from 'classnames'

import Skeleton from '@psdhub/common/components/Skeleton'
import { Text, Avatar } from '@psdhub/common/components'

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
      alignItems="center"
      height="4rem"
      minW={['7.25rem', '10.25rem', '10.25rem', '19.25rem']}
      boxShadow="sm"
      p="0.5rem"
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
        rounded="50%"
      >
        <Avatar
          w="40px"
          h="40px"
          name="Lorem ipsum"
          backgroundColor="#B0BEC5"
          color="black"
          fontWeight="normal"
        />
      </Skeleton>

      <Skeleton
        isLoaded={false}
        startColor="rgba(0, 0, 0, 0.11)"
        endColor="rgba(0, 0, 0, 0.18)"
        fadeDuration={1}
        ml="8px"
      >
        <Text ml="8px" fontSize="0.875rem">
          Lorem ipsum Lorem ipsum ipsum
        </Text>
      </Skeleton>
    </Container>
  )
}

export default FakeLoadingCard
