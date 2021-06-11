import React from 'react'

import renderOptions, { RenderOptionsProps } from './utils/renderOptions'

const Tree: React.FC = () => {
  const handleClick = (data: any) => {
    console.log(data)
  }

  const data: RenderOptionsProps = {
    level: 0,
    items: [
      {
        label: 'teste',
        value: '1',
        options: [
          {
            label: 'teste dentro',
            value: '123'
          },
          {
            label: 'teste dentro',
            value: '123456',
            options: [
              {
                label: 'teste dentro',
                value: '123456789'
              }
            ]
          }
        ]
      }
    ]
  }

  return renderOptions(data, handleClick)
}

export default Tree
