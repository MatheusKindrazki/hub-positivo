import * as utils from '../../../../../common/components/Tree/utils/index'
import handleClickParents from '../../../../../common/components/Tree/utils/handleClickParents'

describe('handleClickParents should work as expected', () => {
  afterEach(jest.clearAllMocks)

  const spyOnChildClick = jest.spyOn(utils, 'onChildClick')
  const spyOnGetPath = jest.spyOn(utils, 'onGetPath')
  const spyonSetCheckParent = jest.spyOn(utils, 'onSetCheckParent')

  const mockedData = [
    {
      label: 'test-label',
      value: 'test-label'
    }
  ]

  it('should iterate through data and set checked items', () => {
    const mockedItem = {
      label: 'test-label',
      value: 'test-label'
    }

    handleClickParents(mockedData, mockedItem)

    const childClickParams = [
      [{ isChecked: 1, label: 'test-label', value: 'test-label' }],
      { label: 'test-label', value: 'test-label' },
      1
    ]

    const getPathParams = [
      [{ isChecked: 1, label: 'test-label', value: 'test-label' }],
      { label: 'test-label', value: 'test-label' }
    ]

    const setCheckParentParams = [
      [{ isChecked: 1, label: 'test-label', value: 'test-label' }],
      0,
      [0]
    ]

    expect(spyOnChildClick).toHaveBeenCalledWith(...childClickParams)
    expect(spyOnGetPath).toHaveBeenCalledWith(...getPathParams)
    expect(spyonSetCheckParent).toHaveBeenCalledWith(...setCheckParentParams)
  })
  it('should iterate through data and set checked items differently if item is checked', () => {
    const mockedItem = {
      label: 'test-label',
      value: 'test-label',
      isChecked: 1
    }

    handleClickParents(mockedData, mockedItem)

    const childClickParams = [
      [{ isChecked: 0, label: 'test-label', value: 'test-label' }],
      { isChecked: 1, label: 'test-label', value: 'test-label' },
      0
    ]

    const getPathParams = [
      [{ isChecked: 0, label: 'test-label', value: 'test-label' }],
      { isChecked: 1, label: 'test-label', value: 'test-label' }
    ]

    const setCheckParentParams = [
      [{ isChecked: 0, label: 'test-label', value: 'test-label' }],
      0,
      [0]
    ]

    expect(spyOnChildClick).toHaveBeenCalledWith(...childClickParams)
    expect(spyOnGetPath).toHaveBeenCalledWith(...getPathParams)
    expect(spyonSetCheckParent).toHaveBeenCalledWith(...setCheckParentParams)
  })

  it('should iterate through data and set checked items differently if item is checked', () => {
    const mockedItem = {
      label: 'test-label',
      value: 'test-label',
      isChecked: 2
    }

    handleClickParents(mockedData, mockedItem)

    const childClickParams = [
      [{ isChecked: 1, label: 'test-label', value: 'test-label' }],
      { isChecked: 2, label: 'test-label', value: 'test-label' },
      1
    ]

    const getPathParams = [
      [{ isChecked: 1, label: 'test-label', value: 'test-label' }],
      { isChecked: 2, label: 'test-label', value: 'test-label' }
    ]

    const setCheckParentParams = [
      [{ isChecked: 1, label: 'test-label', value: 'test-label' }],
      0,
      [0]
    ]

    expect(spyOnChildClick).toHaveBeenCalledWith(...childClickParams)
    expect(spyOnGetPath).toHaveBeenCalledWith(...getPathParams)
    expect(spyonSetCheckParent).toHaveBeenCalledWith(...setCheckParentParams)
  })

  it('should early return if no item is provided', () => {
    const mockedItem = undefined as any

    handleClickParents(mockedData, mockedItem)

    expect(spyOnChildClick).not.toHaveBeenCalled()
    expect(spyOnGetPath).not.toHaveBeenCalled()
    expect(spyonSetCheckParent).not.toHaveBeenCalled()
  })
  it('shouldnt call onSetCheckParent if onGetPath returns falsy', () => {
    spyOnGetPath.mockReturnValue(undefined)

    const mockedItem = {
      label: 'test-label',
      value: 'test-label'
    }

    handleClickParents(mockedData, mockedItem)

    expect(spyonSetCheckParent).not.toHaveBeenCalled()
  })
})
