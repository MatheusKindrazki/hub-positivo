import React, { useMemo, useContext } from 'react'

import { useTransition, config } from 'react-spring'

import { truncateString } from '@psdhub/common/utils/truncateString'
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
  const { state, isBadge, isSearchable, labelLength } =
    useContext(SelectContext)

  const fadeInTransition = useTransition(props.focus, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    config: config.molasses,
    delay: 200
  })

  const { placeholder = 'Selecione', searchable } = props

  if (!props.focus) searchable && searchable('')

  const renderValue = useMemo(() => {
    const checked = getLabelsOrValues(state.raw, 'label')

    if (!checked.length) return placeholder

    return checked
      .map((item: string) => {
        if (!labelLength) return item

        return truncateString(item, labelLength)
      })
      .join(', ')
  }, [state.raw, placeholder, labelLength])

  const renderComponent = useMemo(() => {
    if (!isBadge && !props.focus) {
      return <Box noOfLines={1}>{renderValue}</Box>
    }

    if (isSearchable && props.focus) {
      return fadeInTransition(
        (style, item) =>
          item && (
            <InputSearch
              style={style}
              placeholder={'Digite para buscar'}
              searchable={searchable}
            />
          )
      )
    }

    if (!state?.checked?.length) {
      return <Box as="span">{renderValue}</Box>
    }

    return <Badges itens={getLabelsOrValues(state.raw, 'label')} />
  }, [
    isBadge,
    props.focus,
    isSearchable,
    state,
    renderValue,
    fadeInTransition,
    searchable
  ])

  return (
    <Box pointerEvents="none" className="hub-control">
      {renderComponent}
    </Box>
  )
}

export default Control
