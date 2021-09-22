import useDebounce from '../../hooks/useDebounce'

describe('useDebounce hook should work as expected', () => {
  beforeEach(() => jest.useFakeTimers())

  it('should call received callback function', () => {
    const callback = jest.fn()

    const debouncedFunction = useDebounce(() => callback())

    debouncedFunction()

    expect(callback).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(callback).toHaveBeenCalled()
  })

  it('should immediatly call received callback when options.isImmediate is true', () => {
    const callback = jest.fn()

    const debouncedFunction = useDebounce(() => callback(), 1000, {
      isImmediate: true
    })

    debouncedFunction()

    jest.runAllTimers()

    expect(callback).toHaveBeenCalled()
  })

  it('should respect maxwait setting', () => {
    const callback = jest.fn()

    const debouncedFunction = useDebounce(() => callback(), 1000, {
      maxWait: 1000
    })

    debouncedFunction()

    jest.runAllTimers()

    expect(callback).toHaveBeenCalled()
  })

  it('should call options callback', () => {
    const callback = jest.fn()
    const optionsCallback = jest.fn()

    const debouncedFunction = useDebounce(() => callback(), 1000, {
      callback: optionsCallback
    })

    debouncedFunction()

    jest.runAllTimers()

    expect(callback).toHaveBeenCalled()
    expect(optionsCallback).toHaveBeenCalled()
  })
})
