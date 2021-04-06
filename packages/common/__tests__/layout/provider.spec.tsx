import React, { useContext } from 'react'

import { renderHook } from '@testing-library/react-hooks'
import '@testing-library/jest-dom'

import { render, act } from '@psdhub/test-utils'

import ThemeContext from '../../layout/Provider/context'
import { HubProvider } from '../../layout'

describe('Testing Theme Provider', () => {
  it('should change theme when profile changes', () => {
    const profile = 'administrador'
    // renderizando hook de contexto para alteração de profile theme
    const {
      result: { current }
    } = renderHook(() => useContext(ThemeContext))
    const children = 'testing'
    const { getByText } = render(<HubProvider>{children}</HubProvider>)
    const spyCurrentTheme = jest.spyOn(current, 'theme')
    expect(spyCurrentTheme).not.toHaveBeenCalled()
    act(() => {
      current.theme({ profile })
    })
    expect(spyCurrentTheme).toHaveBeenCalledWith({ profile })
    expect(getByText(children)).toBeInTheDocument()
  })
})
