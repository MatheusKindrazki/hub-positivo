import React from 'react'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'

import ControlTable from '~/components/ControlTable'

import { mockedData } from './mock'

const AccessControl: React.FC = () => {
  return (
    <Accordion>
      {mockedData.map(categoria => {
        return (
          <AccordionItem key={categoria.name}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {categoria.name}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <ControlTable solutions={categoria.solutions} />
            </AccordionPanel>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default AccessControl
