import { DataScripts, ReturnScripts } from '~/orchestrator/types'
import { loadScripts } from '~/orchestrator/index'

describe('LoadScripts should works as expected', () => {
  it('should return the correct data', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve<any>({
        ok: true,
        json: () => ({
          files: { 'testfile.css': 'teste' },
          element_id: 'fake-id'
        })
      })
    )
    const mockedParams: DataScripts = { manifestUrl: 'http://teste-url.com' }
    const expectedResult: ReturnScripts = {
      element_id: 'fake-id',
      scripts: [
        {
          type: 'css',
          url: 'teste'
        }
      ]
    }

    const result = await loadScripts(mockedParams)

    expect(result).toEqual(expectedResult)
  })

  it('should return empty scripts array when theres no accepted extensios on provided files', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve<any>({
        ok: true,
        json: () => ({
          files: { 'testfile.jpg': 'teste' },
          element_id: 'fake-id'
        })
      })
    )

    const mockedParams: DataScripts = { manifestUrl: 'http://teste-url.com' }
    const expectedResult: ReturnScripts = {
      element_id: 'fake-id',
      scripts: []
    }

    const result = await loadScripts(mockedParams)

    expect(result).toEqual(expectedResult)
  })

  it('should early return when api returns with an error', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve<any>({
        ok: false
      })
    )

    const mockedParams: DataScripts = { manifestUrl: 'http://teste-url.com' }
    const errorString = new Error('Erro ao carregar solução')

    try {
      await loadScripts(mockedParams)
    } catch (e) {
      expect(e).toStrictEqual(errorString)
    }
  })
})
