import { createElement } from 'react'

import TreeItens from '../components/TreeItens'
export interface RenderOptionsProps {
  items?: OptionsProps[]
  level: number
}
export interface OptionsProps {
  label: string
  value: string
  isChecked?: boolean
  isIndeterminate?: boolean
  options?: OptionsProps[]
}

const renderOptions = (
  data: RenderOptionsProps,
  handleClick: (data: any) => void
): any => {
  const { items, level } = data

  const indexLevel = level + 1

  return items?.map(item => {
    return createElement(
      TreeItens,
      {
        className: `hub-option_${level}`,
        onChange: (e: any, c: any) =>
          handleClick({ element: e, children: c, level }),
        ...item
      },
      item?.options &&
        renderOptions(
          {
            items: item?.options,
            level: indexLevel
          },
          handleClick
        )
    )
  })
}

export default renderOptions
