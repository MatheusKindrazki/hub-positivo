import noticeError from '../../services/noticeError'

describe('New relic noticeError', () => {
  const dispatchNoticeError = jest.fn()
  Object.assign(window, {
    newrelic: {
      noticeError: dispatchNoticeError
    }
  })

  it('should call noticeError', () => {
    const error = new Error('test')

    noticeError(error)
    expect(dispatchNoticeError).toHaveBeenCalledWith(error)
  })
})
