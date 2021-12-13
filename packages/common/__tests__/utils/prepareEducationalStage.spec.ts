import prepareEducationalStage, {
  ContentResponse
} from '../../../common/utils/prepareEducationalStage'

let mockedContentResponse: ContentResponse = {
  value: 'EM',
  label: 'teste',
  turmas: [
    { nomeTurma: 'nomeTurma', nomeSerie: 'nomeSérie', turmaValida: true }
  ]
}

describe('prepareEducationalStage should work properly', () => {
  it('should return object with correct keys and values', () => {
    const mockedResult = {
      levels: [
        {
          label: 'teste',
          value: 'EM',
          series: [{ class: 'nomeSérie', name: 'nomeTurma', valid: true }]
        }
      ],
      selected: 'EM'
    }
    const result = prepareEducationalStage([mockedContentResponse])
    expect(result).toStrictEqual(mockedResult)
  })

  it('should return empty object if no data is received', () => {
    const mockedResult = {}
    const result = prepareEducationalStage()
    expect(result).toStrictEqual(mockedResult)
  })

  it('should return empty array with no selected option if data.turmas is undefined', () => {
    mockedContentResponse = {
      label: 'teste',
      value: 'teste',
      turmas: undefined
    } as any
    const mockedResult = {
      levels: [],
      selected: ''
    }

    const result = prepareEducationalStage([
      mockedContentResponse
    ] as ContentResponse[])

    expect(result).toStrictEqual(mockedResult)
  })
})
