import transpileProfile from '@psdhub/common/utils/transpileProfile'

describe('Profile structure', () => {
  it('Must return the correct structure following a pre-defined string', () => {
    const correctProfile = 'PAIS_E_RESPONSAVEIS'

    const expectedProfile = {
      value: 'PAIS_E_RESPONSAVEIS',
      label: 'Família'
    }

    expect(transpileProfile(correctProfile)).toEqual(expectedProfile)
  })
})
