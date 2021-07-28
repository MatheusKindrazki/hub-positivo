import React, { useContext, useMemo, useState } from 'react'

import Tree from '@psdhub/common/components/Tree'

import { ContainerOptions } from './styles'
import NotFound from '../../NotFound'
import { filterRecursive } from '../../../utils'
import { TreeNode } from '../../../types'
import SelectContext from '../../../context'

const DefaultVariant: React.FC = props => {
  const context = useContext(SelectContext)

  const { options, state, onChange, noOptionsMessage } = context

  const [renderedOptions, setRenderedOptions] = useState(options)

  const renderDefaultOptions = useMemo(() => {
    return state.checked
  }, [state.checked])

  context.searchable = (e: string) => {
    if (!e) return setRenderedOptions(options)

    const filteredOptions = filterRecursive<TreeNode>(options, e)
    setRenderedOptions(filteredOptions)
  }

  return (
    <ContainerOptions>
      {renderedOptions?.length ? (
        <Tree
          {...props}
          options={renderedOptions}
          defaultOptions={renderDefaultOptions}
          onChange={onChange}
        />
      ) : (
        <NotFound noOptionsMessage={noOptionsMessage as React.FC} />
      )}
    </ContainerOptions>
  )
}

export default DefaultVariant
