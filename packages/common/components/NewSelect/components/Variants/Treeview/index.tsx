import React, { useContext, useMemo } from 'react'

import Tree from '@psdhub/common/components/Tree'

import { ContainerOptions } from './styles'
import SelectContext from '../../../context'

const DefaultVariant: React.FC = props => {
  const { options, state, onChange } = useContext(SelectContext)

  const renderDefaultOptions = useMemo(() => {
    return state.checked
  }, [state.checked])

  return (
    <ContainerOptions>
      <Tree
        {...props}
        options={options}
        defaultOptions={renderDefaultOptions}
        onChange={onChange}
      />
    </ContainerOptions>
  )
}

export default DefaultVariant
