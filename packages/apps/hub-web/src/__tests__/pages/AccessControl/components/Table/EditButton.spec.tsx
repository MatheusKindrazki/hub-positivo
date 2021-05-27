import React from 'react'

import * as reactRouter from 'react-router'

import * as redux from 'react-redux'

import { render, fireEvent } from '@psdhub/test-utils'

import EditButton from '~/pages/AccessControl/components/Table/components/EditButton'

jest.mock('react-router')

describe('', () => {
  const dispatch = jest.fn()
  const push = jest.fn()

  beforeEach(() => {
    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)
    jest.spyOn(reactRouter, 'useHistory').mockReturnValue({
      push
    } as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('Should handle when user click on its name (editar)', () => {
    const payload = {
      id: 'id-123-id'
    }
    const url = 'https://url.com'
    const { getByText } = render(
      <EditButton solutionId={payload.id} url={url} />
    )
    const editButton = getByText('Editar', { exact: false })
    fireEvent.click(editButton)

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenCalledWith({
      payload,
      type: '@permissions/PROFILE_PERMISSIONS_BYID_REQUEST'
    })
    expect(dispatch).toHaveBeenCalledWith({
      payload,
      type: '@permissions/SCHOOL_PERMISSION_BYID_REQUEST'
    })
    expect(dispatch).toHaveBeenCalledWith({
      type: '@permissions/GETALL_PROFILE_PERMISSIONS_REQUEST'
    })

    expect(push).toHaveBeenCalledWith(url)
  })
})
