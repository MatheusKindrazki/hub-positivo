import React, { MutableRefObject, useRef } from 'react'

import { renderHook } from '@testing-library/react-hooks'

import { act, fireEvent, render, waitFor } from '@psdhub/test-utils'

import SchoolList, {
  SchoolListHandler
} from '~/pages/AccessControl/pages/SubmitSolution/SchoolList'

describe('SchoolList component', () => {
  it('Should render properly display data with correct labels', async () => {
    const {
      result: { current: schoolListRef }
    } = renderHook(() => useRef<SchoolListHandler>())

    const { getByText } = render(
      <SchoolList
        ref={schoolListRef as MutableRefObject<SchoolListHandler>}
        onDelete={jest.fn()}
      />
    )

    act(() =>
      schoolListRef.current?.setValue([
        { value: 'valor teste', label: 'teste' }
      ])
    )

    expect(getByText('teste')).toBeInTheDocument()
  })

  it('Should delete an item when X icon is clicked', async () => {
    const mockedOnDelete = jest.fn()

    const {
      result: { current: schoolListRef }
    } = renderHook(() => useRef<SchoolListHandler>())

    const { getAllByTestId } = render(
      <SchoolList
        ref={schoolListRef as MutableRefObject<SchoolListHandler>}
        onDelete={mockedOnDelete}
      />
    )

    act(() =>
      schoolListRef.current?.setValue([
        { value: 'valor teste', label: 'teste' },
        { value: 'segundo teste', label: 'outro teste' }
      ])
    )

    const deleteButtons = getAllByTestId('delete-btn')

    fireEvent.click(deleteButtons[0])
    fireEvent.click(deleteButtons[1])

    await waitFor(() => {
      expect(mockedOnDelete).toHaveBeenCalledTimes(2)
    })
  })

  it('Should delete all items on "Apagar tudo" button', async () => {
    const {
      result: { current: schoolListRef }
    } = renderHook(() => useRef<SchoolListHandler>())

    const { queryByText, getByText } = render(
      <SchoolList
        ref={schoolListRef as MutableRefObject<SchoolListHandler>}
        onDelete={jest.fn()}
      />
    )

    act(() =>
      schoolListRef.current?.setValue([
        { value: 'valor teste', label: 'teste' },
        { value: 'segundo teste', label: 'outro teste' }
      ])
    )
    fireEvent.click(getByText('Apagar tudo'))

    await waitFor(() => expect(queryByText('teste')).toBe(null))
  })
})
