import * as utils from '@psdhub/common/utils'

import { getEducationalStage } from '~/services/getEducationalStage'

import { voidFunction } from '~/utils/voidFunction'

jest.mock('~/store', () => ({
  store: {
    getState: jest
      .fn()
      .mockImplementation(() => ({
        educationalStage: { level: 'level' }
      }))
      .mockImplementationOnce(() => ({
        educationalStage: { level: null }
      }))
  }
}))

describe('getEducationalStage should work properly', () => {
  it('Should return level', async () => {
    const level = await getEducationalStage()
    expect(level).toStrictEqual('level')
  })

  it('Should call delay and itself if level is not provided', async () => {
    jest.useFakeTimers()

    const spyDelay = jest
      .spyOn(utils, 'delay')
      .mockImplementation(voidFunction as any)
    const level = await getEducationalStage()
    jest.runAllTimers()

    expect(spyDelay).toHaveBeenCalledWith(200)
    expect(level).toStrictEqual('level')
  })
})
