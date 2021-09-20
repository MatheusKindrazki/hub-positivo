import {
  prepareSchool,
  prepareRoles
} from '../../../common/utils/prepareSchoolAndRoles'

describe('Adjust school structure and profiles', () => {
  it('Should return data structure of schools', () => {
    const mockSchool = {
      id: 'mocked-id',
      name: 'Escola Positivo',
      roles: ['PROFESSOR', 'ADMINISTRADOR']
    }

    const expectSchoolStructure = [
      {
        ...mockSchool,
        roles: ['PROFESSOR', 'ADMINISTRADOR'],
        label: 'Escola Positivo',
        value: 'mocked-id'
      }
    ]
    expect(prepareSchool()).toEqual([])
    expect(prepareSchool([mockSchool])).toEqual(expectSchoolStructure)
  })

  it('Should return data structure of Roles', () => {
    const mockRoles = ['PAIS_E_RESPONSAVEIS']
    const mockRolesNoInfo = ['NOT_ROLE_INFO']

    const expectRoleStructure = [
      {
        name: 'Família',
        icon: 'família',
        colorProfile: 'família',
        id: 'PAIS_E_RESPONSAVEIS',
        label: 'Família',
        value: 'família'
      }
    ]

    const expectRoleStructureNotInfo = [
      {
        name: 'Desconhecido',
        icon: 'default',
        colorProfile: 'default',
        id: 'default',
        label: 'Desconhecido',
        value: 'default'
      }
    ]

    expect(prepareRoles(mockRolesNoInfo)).toEqual(expectRoleStructureNotInfo)
    expect(prepareRoles()).toEqual([])
    expect(prepareRoles(mockRoles)).toEqual(expectRoleStructure)
  })
})
