import prepareEducationalStage, {
  ContentResponse
} from '~/utils/prepareEducationalStage'

const mockedContentResponse: ContentResponse = {
  ativo: true,
  serie: {
    nome: 'teste',
    ciclo: {
      nome: 'EM'
    }
  }
}

describe('prepareEducationalStage should work properly', () => {
  it('should return object with correct keys and values', () => {
    const mockedResult = {
      levels: [{ label: 'Ensino Médio', value: 'EM' }],
      selected: 'EM'
    }
    const result = prepareEducationalStage([mockedContentResponse])
    expect(result).toStrictEqual(mockedResult)
  })

  it('should return empty object if data.serie.ciclo is undefined', () => {
    const mockedContentResponse = {
      ativo: true,
      serie: {
        nome: 'teste'
      }
    }
    const mockedResult = {
      levels: [
        {
          label: undefined,
          value: undefined
        }
      ],
      selected: ''
    }

    const result = prepareEducationalStage([
      mockedContentResponse
    ] as ContentResponse[])

    expect(result).toStrictEqual(mockedResult)
  })

  it('should return empty object if ativo is false', () => {
    mockedContentResponse.serie.ciclo = { nome: 'EM' }
    mockedContentResponse.ativo = false
    const mockedResult = {
      levels: [],
      selected: ''
    }
    const result = prepareEducationalStage([mockedContentResponse])
    expect(result).toStrictEqual(mockedResult)
  })

  it('should return empty object if no data is received', () => {
    const mockedResult = {}
    const result = prepareEducationalStage()
    expect(result).toStrictEqual(mockedResult)
  })
})
