import React, { useState } from 'react'

import Text, { TextProps } from '@psdhub/common/components/Text'
import { Stack } from '@psdhub/common/components/'

interface ReadMoreProps extends TextProps {
  maxLength: number
  children: string
}

const ReadMore: React.FC<ReadMoreProps> = ({
  children,
  maxLength,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (children.length < maxLength) return <Text {...rest}>{children}</Text>

  return (
    <Stack direction="column">
      <Text {...rest} noOfLines={!isOpen ? 1 : undefined}>
        {isOpen ? children : children.slice(0, maxLength) + '...'}
      </Text>
      <Text
        as="p"
        onClick={() => setIsOpen(e => !e)}
        color="gray.500"
        cursor="pointer"
        textAlign="end"
        flexWrap="nowrap"
        aria-label="teste"
      >
        {isOpen ? ' Esconder' : ' Ver tudo'}
      </Text>
    </Stack>
  )
}

export default ReadMore
