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

  const { placeholder = 'Selecione' } = props

  const renderValue = useMemo(() => {
    const checked = getLabelsOrValues(state.raw, 'label')?.join(',')

    if (!checked) return placeholder

    return labelLength ? truncateString(checked, labelLength) : checked
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
              searchable={e => console.log(e)}
            />
          )
      )
    }

    if (!state?.checked?.length) {
      return <Box as="span">{renderValue}</Box>
    }

    return <Badges itens={getLabelsOrValues(state.raw, 'label')} />
  }, [isBadge, isSearchable, props.focus, renderValue, state, fadeInTransition])

  return (
    <Box pointerEvents="none" className="hub-control">
      {renderComponent}
    </Box>
  )
}

export default Control
