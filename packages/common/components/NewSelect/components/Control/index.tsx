import React, { useMemo, useContext } from 'react'

import { useTransition } from 'react-spring'

import { Box } from '@psdhub/common/components'

import InputSearch from '../Input'
import Badges from '../Badges'
import { getLabelsOrValues } from '../../utils'
import SelectContext from '../../context'

interface ControleProps {
  searchable?: (string: string) => void
  focus?: boolean
  placeholder?: string
}

const Control: React.FC<ControleProps> = props => {
  const { state, isBadge, isSearchable } = useContext(SelectContext)

  const transition = useTransition(props.focus, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    to: { opacity: 1 }
  })

  const { placeholder = 'Selecione' } = props

  const renderValue = useMemo(() => {
    const checked = getLabelsOrValues(state.raw, 'label')?.join(',')
    return checked || placeholder
  }, [state, placeholder])

  const renderComponent = useMemo(() => {
    if (!isBadge && !props.focus) {
      return (
        <Box as="span" noOfLines={1}>
          {renderValue}
        </Box>
      )
    }

    if (isSearchable) {
      return transition(
        (style, item) =>
          item && (
            <InputSearch
              style={style}
              placeholder={!isBadge ? renderValue : 'Digite para buscar'}
              searchable={e => console.log(e)}
            />
          )
      )
    }

    if (!state?.checked?.length) {
      return <Box as="span">{renderValue}</Box>
    }

    return <Badges itens={getLabelsOrValues(state.raw, 'label')} />
  }, [isBadge, isSearchable, props.focus, renderValue, state, transition])

  return <Box className="hub-control">{renderComponent}</Box>
}

export default Control
