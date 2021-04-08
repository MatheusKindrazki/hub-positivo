import React from 'react'

import { render } from '@hub/test-utils'

import * as Components from '../../components'

type StringPropsKeys<T extends { [key: string]: any }> = {
  [P in keyof T]: any
}
type ComponentProps = typeof Components

export type VariantsProps = keyof StringPropsKeys<ComponentProps>

describe('Root import components', () => {
  it('I hope these components are called', () => {
    Object.keys(Components).map(i => {
      const RenderComponent = Components[i as VariantsProps] as React.FC

      expect(RenderComponent).toBeTruthy()
    })
  })
})