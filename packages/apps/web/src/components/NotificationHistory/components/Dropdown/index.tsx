import React from 'react'

import { Header, Container } from '..'

import { Box } from '@psdhub/common/components'

import { Container as BoxUI } from './styles'

export interface DropDownProps {
  goToSettings: () => void
  markAllAsRead: () => void
}

const Dropdown: React.FC<DropDownProps> = ({ markAllAsRead, goToSettings }) => {
  return (
    <Box maxW="26rem" borderRadius="8px" border="solid 1px #E5E5E5">
      <Header
        title="Notificações"
        markAllAsRead={markAllAsRead}
        goToSettings={goToSettings}
      />
      <BoxUI
        w="100%"
        overflowY={['scroll', 'overlay']}
        overflowX="hidden"
        maxH="25.5rem"
      >
        <Container
          read={false}
          solutionName="Playground"
          date={new Date()}
          imageURL="https://sthubdigitalprod001.blob.core.windows.net/imagenscard/icon-rec-playground.svg"
          message="Jogos e Objetos Educacionais para a Educação Infantil"
        />
        <Container
          read={true}
          solutionName="Minha agenda"
          date={new Date()}
          imageURL="https://sthubdigitalprod001.blob.core.windows.net/imagenscard/icon-com-agenda.svg"
          message="Visualize eventos em que você foi convidado"
        />
        <Container
          read={false}
          solutionName="Feed de Mensagens"
          date={new Date()}
          imageURL="https://sthubdigitalprod001.blob.core.windows.net/imagenscard/icon-com-feed.svg"
          message="Acompanhe as mensagens recebidas por você. Visualize eventos em que você foi convidado. Ferramenta de comunicação com a escola. Jogos e Objetos Educacionais para a Educação Infantil. Visualize eventos em que você foi convidado"
        />
        <Container
          read={true}
          solutionName="Minha agenda"
          date={new Date()}
          imageURL="https://sthubdigitalprod001.blob.core.windows.net/imagenscard/icon-com-agenda.svg"
          message="Visualize eventos em que você foi convidado"
        />
      </BoxUI>
    </Box>
  )
}

export default Dropdown
