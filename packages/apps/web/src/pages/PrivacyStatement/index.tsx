import React from 'react'

import { Table } from '@psdhub/common/components'

import { Container, Main } from './styles'

// h1 => h2 =>  h3 => h4 => p

const PrivacyStatement: React.FC = () => {
  return (
    <Container>
      <h1>AVISO DE PRIVACIDADE – ESCOLAS</h1>

      <Main>
        <p>
          O Positivo On é uma plataforma da PSD Educacional voltada para a
          disponibilização de material didático, ferramentas de avaliação, aulas
          online, repositório de arquivos de professores, mensageria (da escola
          para o aluno ou responsável), objetos educacionais, vídeos aulas e
          agendamento. Este documento busca explicar brevemente como os dados
          pessoais dos colaboradores das escolas são utilizados pela nossa
          plataforma.
        </p>
        <h3>
          1. COMO O SISTEMA DE ENSINO POSITIVO USA OS SEUS DADOS PESSOAIS?
        </h3>
        <p></p>
        <Table
          columns={[
            { property: 'finalidade', header: 'Finalidade' },
            { property: 'dados', header: 'Dados Pessoais' },
            { property: 'base', header: 'Base Legal' }
          ]}
          data={[
            {
              finalidade: 'Registro de acesso à plataforma',
              dados:
                'Data e hora de início e término da conexão, sua duração e o endereço IP utilizado',
              base: 'Obrigação Legal'
            },
            {
              finalidade: 'Cadastro do usuário / acesso à plataforma',
              dados:
                'Nome, login, e-mail, CPF e perfil (indicando se é professor/ coordenador/administrador) Optativo: telefone fixo, celular e foto.',
              base: 'Legítimo interesse'
            },
            {
              finalidade: 'Integrações com parceiros',
              dados:
                'Nome completo, e-mail, turma e série que prestam os serviços',
              base: 'Legítimo interesse'
            },
            {
              finalidade: 'Comunicações dos serviços do SPE',
              dados: 'Nome e e-mail',
              base: 'Legítimo interesse'
            },
            {
              finalidade: 'Desenvolvimento e melhoria do uso da plataforma',
              dados:
                'Nome, perfil, id do usuário, login, geolocalização, dispositivo, sistema operacional, navegador e e-mail.',
              base: 'Legítimo interesse'
            }
          ]}
        />
        <p></p>
        <h3>2. QUANDO PODEMOS USAR E COMPARTILHAR OS SEUS DADOS?</h3>

        <p>
          No geral, estamos autorizados a utilizar ou a compartilhar os seus
          dados para: (a) a execução de um contrato firmado entre você e a
          instituição de ensino; (b) o cumprimento de obrigação legal; ou (c)
          para atender um interesse legítimo.
        </p>
        <h3>3. COMO USAMOS COOKIES?</h3>

        <h4>O que é um cookie?</h4>

        <p>
          Cookies são pequenos arquivos de texto armazenados em seu navegador ou
          dispositivo. Eles permitem que certas funcionalidades possam ser
          implementas em nossas plataformas e nos ajuda a compreender melhor
          como você a utiliza. Os cookies geralmente têm uma data de expiração.
          Alguns cookies são excluídos automaticamente quando o navegador é
          fechado (os chamados cookies de sessão), enquanto outros podem ser
          armazenados por mais tempo no dispositivo até serem excluídos
          manualmente (os chamados cookies persistentes).
        </p>

        <p>Nós utilizamos os seguintes tipos de cookies:</p>
        <p>
          <b>cookies estritamente necessários</b> - para que nossa plataforma
          funcione corretamente, autenticando logins, por exemplo. Por isso, não
          é possível recusar estes cookies se você quiser acessar a nossa
          plataforma;
        </p>
        <p>
          <b>cookies de sessão</b> – os cookies de sessão possibilitam que as
          atividades dos usuários sejam reconhecidas mesmo após eles ingressarem
          em outra página e depois voltarem à página anterior, mantendo as
          informações fornecidas pelo usuário para facilitar sua jornada; e
        </p>
        <p>
          <b>cookies de análise</b> - para melhorar o conteúdo da nossa
          plataforma, a sua experiência como usuário, e para nos ajudar a
          desenvolver novos produtos e serviços. Esses cookies realizam a coleta
          automática de determinados dados pessoais para nos fornecer
          informações sobre como a plataforma está sendo utilizada,
          identificando, por exemplo, quantas vezes determinada página foi
          visitada.
        </p>
        <h4>INFORMAÇÕES ADICIONAIS E CONTATO</h4>
        <p>
          Se você ainda tem alguma dúvida sobre como utilizamos os seus dados,
          quais são os seus direitos como titular ou qualquer outra dúvida
          relacionada a dados pessoais, por favor acesse a nossa{' '}
          <a href={process.env.PUBLIC_URL + '/#/politica-de-privacidade'}>
            Política de Privacidade{' '}
          </a>
          consulte a sua Instituição de Ensino, ou fale conosco pelos nossos
          canais de contato.
        </p>
      </Main>
    </Container>
  )
}

export default PrivacyStatement
