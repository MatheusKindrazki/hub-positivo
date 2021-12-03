const educationalValue = {
  EM: 'Ensino Médio',
  EF2: 'Ensino Fundamental Anos Finais',
  EF1: 'Ensino Fundamental Anos Iniciais',
  EI: 'Educação Infantil'
}

export interface Ciclos {
  label: string
  value: string
  serie?: string
}

export interface ContentResponse {
  ativo: boolean
  serie: {
    nome?: string
    ciclo: {
      nome: 'EM' | 'EF2' | 'EF1' | 'EI'
    }
  }
}

interface Response {
  selected: string
  levels: Ciclos[]
}

export default function prepareStaged(data?: ContentResponse[]): Response {
  if (!data) return {} as Response

  const ciclos = [] as Ciclos[]
  let selectedCiclo = ''
  let setDefaultCiclo = false
  data.forEach(e => {
    if (e.ativo) {
      if (!setDefaultCiclo && !!e.serie.ciclo) {
        selectedCiclo = e.serie.ciclo.nome

        setDefaultCiclo = true
      }

      ciclos.push({
        label: educationalValue[e.serie?.ciclo?.nome],
        serie: e.serie?.nome,
        value: e.serie?.ciclo?.nome
      })
    }
  })

  return {
    levels: ciclos,
    selected: selectedCiclo
  }
}
