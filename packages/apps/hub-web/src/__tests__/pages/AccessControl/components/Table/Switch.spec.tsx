import React from 'react'

import * as redux from 'react-redux'

import { render, fireEvent } from '@psdhub/test-utils'

import Switch from '~/pages/AccessControl/components/Table/components/Switch'
describe('Switch AccessControl component', () => {
  const dispatch = jest.fn()

  beforeEach(() => {
    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('Should dispatch an action when its is clicked', async () => {
    const onChangeSwitch = jest.fn()
    const id = 'id'
    const index = 1
    const { getByTestId } = render(
      <Switch
        onChangeSwitch={onChangeSwitch}
        index={index}
        data={{ id, ativo: true } as any}
      />
    )
    const switchButton = getByTestId('switch-button')
    fireEvent.click(switchButton)

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        ativo: false,
        id
      },
      type: '@solutions/SOLUTION_PUT_REQUEST'
    })

    expect(onChangeSwitch).toHaveBeenCalledWith(index)
  })
})
