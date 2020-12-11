export interface StepsTour {
  selector: string
  content: string
  position?: 'top' | 'right' | 'bottom' | 'left' | 'center'
}

const tour: StepsTour[] = [
  {
    content:
      'Realize e aplique suas provas importando questões de um arquivo externo, adicionando questões do nosso banco ou criando questões em branco.',
    selector: '#avaliacao-provas'
  },
  {
    content:
      'Disponibilize e aplique atividades para acompanhar o aprendizado do seu aluno recebendo resultado instantaneamente.',
    selector: '#avaliacao-tarefas'
  },
  {
    content:
      'Prepare os estudantes para os vestibulares e demais provas que irão realizar, incluíndo redação e escolha de disciplinas optativas.',
    selector: '#avaliacao-simulados'
  },
  {
    content:
      'Acompanhe a evolução de seus alunos. Receba resultados detalhados de desempenhos e saiba em quais disciplinas eles precisam melhorar.',
    selector: '#avaliacao-relatorios'
  },
  {
    content:
      'Adicione uma questão de tipo "Redação" em simulados, provas ou tarefas e disponha dessa funcionalidade Redação em suas aplicações.',
    selector: '#avaliacao-redacao'
  },
  {
    content:
      'Conheça e utilize no seu dia a dia recursos digitais educacionais distribuídos semanalmente, como videoaulas, avaliações, livros e muito mais',
    selector: '#recursos-plano-semanal'
  },
  {
    content:
      'Agende ou participe de uma aula virtual de forma dinâmica e integrada utilizando as ferramentas do Google.',
    selector: '#recursos-salas-virtuais'
  },
  {
    content:
      'Visualize os livro didáticos em nosso novo formato digital e também os livros em PDF.',
    selector: '#conteudo-livro-digital'
  }
]

export default tour
