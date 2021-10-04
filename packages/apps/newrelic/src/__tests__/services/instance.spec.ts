import instanceNR from '../../services/instance'

const devMock = jest.fn()
const prodMock = jest.fn()

jest.mock('../../scripts/devInstance.js', () => {
  return devMock()
})

jest.mock('../../scripts/prodInstance.js', () => {
  return prodMock()
})

describe('New relic instance', () => {
  it('should create an instance base development', () => {
    process.env = Object.assign(process.env, {
      REACT_APP_NEW_RELIC_INSTANCE: 'development'
    })

    instanceNR()

    expect(devMock).toBeCalled()
  })

  it('should create an instance base development', () => {
    process.env = Object.assign(process.env, {
      REACT_APP_NEW_RELIC_INSTANCE: 'production'
    })

    instanceNR()

    expect(prodMock).toBeCalled()
  })
})
