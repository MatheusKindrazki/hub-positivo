import { ContextHeaderProps } from '~/components/Header/context/types'

export const useHeaderReturn = {
  schoolList: [
    {
      roles: ['PROFESSOR'],
      label: 'Escola Editora Positivo - Positivo ON SPE',
      value: 'ef6f00c9-bd31-47e4-be51-bbbbbb'
    },
    {
      roles: [
        'PAIS_E_RESPONSAVEIS',
        'COORDENADOR',
        'PROFESSOR',
        'ADMINISTRADOR'
      ],
      label: 'Escola Positivo ON SPE 18-005',
      value: '21694ec0-88be-4231-ac2a-392dbf835518'
    }
  ],
  roleList: [
    {
      name: 'Administrador',
      icon: 'administrador',
      colorProfile: 'administrador',
      id: 'ADMINISTRADOR',
      label: 'Administrador',
      value: 'administrador'
    },
    {
      name: 'Coordenador',
      icon: 'coordenador',
      colorProfile: 'coordenador',
      id: 'COORDENADOR',
      label: 'Coordenador',
      value: 'coordenador'
    }
  ],
  defaultValue: {
    school: {
      label: 'Escola Positivo ON SPE 18-005',
      value: '21694ec0-88be-4231-ac2a-392dbf835518'
    },
    role: { label: 'Administrador', value: 'Administrador' }
  },
  setRole: jest.fn(),
  setSchool: jest.fn(),
  resetInfo: jest.fn()
} as ContextHeaderProps

export const name = 'FirstName LastName'

export const userState = {
  user: {
    user: {
      name
    }
  }
}

export const profileState = {
  profile: { guid: 'PROFESSOR' }
}
