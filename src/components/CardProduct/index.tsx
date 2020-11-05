import React from 'react';

import { Box, Image, Heading, Text } from '@chakra-ui/core';

interface CardProps {
  solution: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  url: string;
}

const CardProduct: React.FC<{ card: CardProps }> = ({ card }) => {
  const { color, description, icon, solution, title, url } = card;

  return (
    <Box
      background="white"
      rounded="md"
      overflow="hidden"
      d="flex"
      height="10rem"
      minW={['10.25rem', '10.25rem', '19.25rem']}
      boxShadow="sm"
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
        <Image width={['4.375rem']} src={icon} />
      </Box>

      <Box
        as="button"
        p={['2', '2', '4']}
        outline="none"
        boxShadow="none"
        onClick={() => {
          window.location.href = url;
        }}
      >
        <Box
          d="flex"
          textAlign="left"
          alignItems="baseline"
          flexDirection="column"
          h="100%"
        >
          <Text color="gray.500" fontSize="0.8125rem" mt={['0.3125rem', '0']}>
            {solution}
          </Text>
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
