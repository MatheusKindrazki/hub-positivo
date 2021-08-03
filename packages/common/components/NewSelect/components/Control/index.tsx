import React, { memo } from 'react'

import { truncateString } from '@psdhub/common/utils/truncateString'
import { Box } from '@psdhub/common/components'

import InputSearch from '../Input'
import Badges from '../Badges'
import { getLabelsOrValues } from '../../utils'
import { useSelect } from '../../context'

interface ControleProps {
  focus?: boolean
  placeholder?: string
  hideSelected?: boolean
}

const Control: React.FC<ControleProps> = props => {
  const { getState, isBadge, isSearchable, labelLength, searchable } =
    useSelect()

  const { placeholder = 'Selecione', hideSelected } = props

  if (!props.focus) searchable && searchable('')

  const renderValue = () => {
    const checked = getLabelsOrValues(getState().raw, 'label')

    if (!checked.length) return placeholder

    if (hideSelected) {
      if (checked.length === 1) {
        return '1 item selecionado'
      }

      return `${checked.length} itens selecionados`
    }

    return checked
      .map((item: string) => {
        if (!labelLength) return item

        return truncateString(item, labelLength)
      })
      .join(', ')
  }

  const renderComponent = () => {
    if (!isBadge && !props.focus) {
      return <Box noOfLines={1}>{renderValue()}</Box>
    }

    if (hideSelected && !props.focus) {
      return <Box noOfLines={1}>{renderValue()}</Box>
    }

    if (isSearchable && props.focus) {
      return (
        <InputSearch
          placeholder={'Digite para buscar'}
          searchable={searchable}
        />
      )
    }

    if (!getState().checked?.length) {
      return <Box as="span">{renderValue()}</Box>
    }

    return <Badges itens={getLabelsOrValues(getState().raw, 'label')} />
  }

  return (
    <Box pointerEvents="none" className="hub-control">
      {renderComponent()}
    </Box>
  )
}

export default memo(Control)
