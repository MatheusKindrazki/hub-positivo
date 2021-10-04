import pageAction from '../../services/pageAction'

describe('New relic pageAction', () => {
  const dispatchPageAction = jest.fn()
  Object.assign(window, {
    newrelic: {
      addPageAction: dispatchPageAction
    }
  })

  it('should dispatch page action', () => {
    pageAction('action', 'data')

    expect(dispatchPageAction).toHaveBeenCalledWith('action', 'data')
  })
})
