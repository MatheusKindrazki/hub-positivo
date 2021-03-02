import React from 'react'

import * as Components from '../../components/Icons'

type StringPropsKeys<T extends { [key: string]: any }> = {
  [P in keyof T]: any
}
type ComponentProps = typeof Components

export type VariantsProps = keyof StringPropsKeys<ComponentProps>

describe('Root import icons', () => {
  it('I hope these components are called', () => {
    Object.keys(Components).map(i => {
      const RenderComponent = Components[i as VariantsProps] as React.FC

      expect(RenderComponent).toBeTruthy()
    })
  })
})
