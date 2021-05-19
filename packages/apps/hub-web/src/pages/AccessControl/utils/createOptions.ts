import { Option } from '../pages/CreateSolution/formSelects'

interface profilesData {
  perfil: string
  nivelEnsino: string
  id: string
}

interface CategoryOrSchoolData {
  nome: string
  id: string
}

const formatProfileOption = (option: profilesData) => {
  const { perfil, nivelEnsino, id } = option
  const formattedProfile = perfil.replaceAll('_', ' ').toLowerCase()
  return {
    label: `${formattedProfile} ${nivelEnsino || ''}`,
    value: id
  }
}

const formatDataOption = (option: CategoryOrSchoolData) => {
  return {
    label: option.nome,
    value: option.id
  }
}

const createOptions = (data: any[]): Option[] => {
  const options = data.map(element => {
    if (element.perfil || element.nivelEnsino) {
      return formatProfileOption(element)
    }
    return formatDataOption(element)
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
    value: 'apenas'
  },
  {
    label: 'Exceto',
    value: 'exceto'
  }
]

export const targetOptions = [
  {
    label: 'microfrontend',
    value: 'microfrontend'
  },
  {
    label: 'iframeblank',
    value: 'iframeblank'
  },
  {
    label: 'wordpress',
    value: 'wordpress'
  },
  {
    label: 'iframenoauth',
    value: 'iframenoauth'
  },
  {
    label: 'targetblank',
    value: 'targetblank'
  },
  {
    label: 'iframe',
    value: 'iframe'
  }
]

export default createOptions
