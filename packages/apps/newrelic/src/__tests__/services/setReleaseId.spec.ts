import setReleaseId from '../../services/setReleaseId'

describe('New relic ReleaseID', () => {
  const dispatchReleaseID = jest.fn()

  Object.assign(window, {
    newrelic: {
      addRelease: dispatchReleaseID
    }
  })

  it('should dispatch the release id', () => {
    setReleaseId('12345')
    expect(dispatchReleaseID).toHaveBeenCalledWith('@hub', '12345')
  })
})
