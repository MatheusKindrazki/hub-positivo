export default [
  {
    id: 'avaliacaoId',
    ativo: true,
    cor: 'blue',
    nome: 'Avaliação',
    solucoes: [
      {
        id: 'provasId',
        ativo: true,
        nome: 'Provas',
        descricao: 'Crie e aplique suas provas',
        link: 'psd.provas.com',
        arquivo: 'provas-file',
        tipoRenderizacao: 'provas-iframe',
        notificacao: 'provas-notificacao',
        slug: 'provas'
      },
      {
        id: 'redacaoId',
        ativo: true,
        nome: 'Redação',
        descricao: 'Inclua redações em suas avaliações',
        arquivo: 'redacao-file',
        tipoRenderizacao: 'redacao-iframe',
        notificacao: 'redacao-notificacao'
      }
    ]
  },
  {
    id: 'recursosId',
    ativo: true,
    cor: 'blue',
    nome: 'Recursos',
    solucoes: [
      {
        id: 'salasVirtuaisId',
        ativo: true,
        nome: 'Salas virtuais',
        descricao: 'Visualize e acesse suas aulas virtuais',
        link: 'psd.salas.com',
        arquivo: 'salasVirtuais-file',
        tipoRenderizacao: 'salasVirtuais-iframe',
        notificacao: 'salasVirtuais-notificacao'
      },
      {
        id: 'playgroundId',
        ativo: true,
        nome: 'Playground',
        descricao: 'Jogos e objetos educacionais',
        arquivo: 'playground-file',
        tipoRenderizacao: 'playground-iframe',
        notificacao: 'playground-notificacao'
      }
    ]
  }
]
