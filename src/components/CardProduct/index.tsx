import React from 'react';

import { Box, Image, Heading, Text, Badge } from '@chakra-ui/core';

export interface CardProps {
  id: number;
  solution?: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  url: string;
  notification?: string | number;
}

const CardProduct: React.FC<{ card: CardProps }> = ({ card }) => {
  const { color, description, icon, solution, title, url, notification } = card;

  return (
    <Box
      background="white"
      rounded="md"
      overflow="hidden"
      d="flex"
      height="8.5rem"
      minW={['10.25rem', '10.25rem', '19.25rem']}
      boxShadow="sm"
      style={{ position: 'relative' }}
    >
      <Box
        h="100%"
        minWidth={['4.7rem', '5.9375rem']}
        d="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor={color}
        p="0.625rem"
      >
        <Image height="3.875rem" src={icon} />
      </Box>

      <Box
        as="button"
        p={['2', '2', '1.1rem']}
        outline="none"
        boxShadow="none"
        onClick={() => {
          window.location.href = url;
        }}
      >
        {notification && (
          <Badge
            position="absolute"
            right="1rem"
            top="1rem"
            backgroundColor="#D81B60"
            color="white"
            w="20px"
            h="20px"
            rounded="100%"
            fontSize="0.75rem"
          >
            {notification}
          </Badge>
        )}
        <Box
          d="flex"
          textAlign="left"
          alignItems="baseline"
          flexDirection="column"
          h="100%"
          pr="1.125rem"
        >
          {solution && (
            <Text color="gray.500" fontSize="0.8125rem" mt={['0.3125rem', '0']}>
              {solution}
            </Text>
          )}
          <Heading as="b" fontWeight="normal" fontSize="1.125rem" color="black">
            {title}
          </Heading>
          <Text mt="2" color="gray.500" fontSize="0.875rem">
            {description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CardProduct;
