import { Option } from '../pages/CreateSolution/selectOptions'

const createCategoryOptions = (categories: any[]): Option[] => {
  // usando a tipo 'any' no parametro da funcao pois ela pode
  // receber tanto um array de escolas como de categorias
  const options = categories.map(element => {
    return {
      label: element.nome,
      value: element.id
    }
  })

  return options
}

export const schoolRestrictionRules = [
  {
    label: 'Todas Escolas',
    value: 'todas escolas'
  },
  {
    label: 'Apenas',
    value: 'false'
  },
  {
    label: 'Exceto',
    value: 'true'
  }
]

export const targetOptions = [
  {
    label: 'Mesma pagina',
    value: 'iframe'
  },
  {
    label: 'Nova aba',
    value: 'targetblank'
  }
]

export const profileOptions = [
  {
    value: '6190aaa0-cbd5-488c-9b49-ab86f52728b1',
    label: 'Administrador'
  },
  {
    value: '3a10ffaa-1e7d-402b-b39f-e839afb0b047',
    label: 'Aluno EF1'
  },
  {
    value: '57b389dd-ce6d-4c8d-9200-068b65eeeb71',
    label: 'Aluno EF2'
  },
  {
    value: '639e2e08-7758-430c-98de-cbdd827704ac',
    label: 'Aluno EI'
  },
  {
    value: '98b56928-c326-4255-86c3-b6c32d273139',
    label: 'Aluno EM'
  },
  {
    value: '319406f6-f10f-4ba9-bd47-7345521616df',
    label: 'Coordenador'
  },
  {
    value: '1a18b4a3-2933-4087-b259-828d4548762a',
    label: 'Pais e Responsáveis'
  },
  {
    value: '1a3b6a61-57d6-42e1-827e-c56bb386276a',
    label: 'Perfil de Sistema'
  },
  {
    value: 'd94e8cfa-5239-475d-9912-152df87cd122',
    label: 'Professor EF1'
  },
  {
    value: 'dd27b96a-4ebf-45c4-bc52-bb144be845af',
    label: 'Professor EF2'
  },
  {
    value: '12d37d84-a4db-4ad2-ac97-32f9195a8b6f',
    label: 'Professor EI'
  },
  {
    value: '7f9cdbca-69a7-4a18-8858-b5ddcaf3d05e',
    label: 'Professor EM'
  }
]

export default createCategoryOptions
