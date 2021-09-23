import React from 'react'

import { useTheme } from '@psdhub/common/layout/styles'
import { ArrowLeft } from '@psdhub/common/components/Icons'
import { Box, Button } from '@psdhub/common/components'

import { Container } from './styles'

interface AnimateGoBackProps {
  onClick: () => void
}

const AnimateGoBack: React.FC<AnimateGoBackProps> = ({ onClick }) => {
  const { colors } = useTheme()

  return (
    <Container className="hub-logo">
      <Button
        data-testid="animated-goback"
        className="goback-button"
        paddingLeft="0px"
        position="absolute"
        background="transparent!important"
        onClick={onClick}
      >
        <Box as={ArrowLeft} size={24} color="blue.500" />
      </Button>
      <Box w="16" className="hub-svg-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 1045.49 543.6"
        >
          <g id="Layer_2" data-name="Layer 2">
            <g id="Camada_1" data-name="Camada 1">
              <path
                fill={colors.blue[300]}
                d="M138.25,405.3a188.82,188.82,0,0,1,0-267l29.32,29.33a147.36,147.36,0,0,0,0,208.34L138.25,405.3ZM79.58,464a271.79,271.79,0,0,1,0-384.32L108.91,109a230.32,230.32,0,0,0,0,325.66L79.58,464Z"
              />
              <path
                fill={colors.blue[500]}
                d="M773.69,0c-113.06,0-210,69.07-251,167.31C481.77,69.09,384.82,0,271.74,0A270.57,270.57,0,0,0,112,51.9l90.05,90a147.35,147.35,0,1,1,0,259.7l-90,90A270.51,270.51,0,0,0,271.74,543.6c96.95,0,182-50.79,230.15-127.2V543.6H626.34V271.83a147.35,147.35,0,1,1,294.7,0V543.6h124.45V271.83C1045.49,121.74,923.77,0,773.69,0Z"
              />
            </g>
          </g>
        </svg>
      </Box>
    </Container>
  )
}

export default AnimateGoBack
