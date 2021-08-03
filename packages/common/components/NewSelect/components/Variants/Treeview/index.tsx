import React, { useState, useLayoutEffect } from 'react'

import Tree from '@psdhub/common/components/Tree'

import { ContainerOptions } from './styles'
import NotFound from '../../NotFound'
import { filterRecursive } from '../../../utils'
import { TreeNode } from '../../../types'
import { useSelect } from '../../../context'

const DefaultVariant: React.FC = props => {
  const context = useSelect()

  const { options, getState, onChange, noOptionsMessage } = context

  const [renderedOptions, setRenderedOptions] = useState(options)
  const [renderDefaultOptions, setRenderDefaultOptions] = useState(
    getState().checked
  )

  context.searchable = (e: string) => {
    if (!e) return setRenderedOptions(options)

    const filteredOptions = filterRecursive<TreeNode>(options, e)
    setRenderedOptions(filteredOptions)
  }

  useLayoutEffect(() => {
    setRenderDefaultOptions(getState().checked)
  }, [getState])

  return (
    <ContainerOptions>
      {renderedOptions?.length ? (
        <>
          <Tree
            {...props}
            options={renderedOptions}
            defaultOptions={renderDefaultOptions}
            onChange={onChange}
          />
        </>
      ) : (
        <NotFound noOptionsMessage={noOptionsMessage as React.FC} />
      )}
    </ContainerOptions>
  )
}

export default DefaultVariant
