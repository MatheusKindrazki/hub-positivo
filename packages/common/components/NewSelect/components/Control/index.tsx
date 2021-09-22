import React, { memo } from 'react'

import { truncateString } from '@psdhub/common/utils/truncateString'
import { Box } from '@psdhub/common/components'

import InputSearch from '../Input'
import Badges from '../Badges'
import { getLabelsOrValues } from '../../utils'
import { useSelect } from '../../context'

export interface ControleProps {
  focus?: boolean
  placeholder?: string
  hideSelected?: boolean
}

const Control: React.FC<ControleProps> = props => {
  const context = useSelect()

  const { getState, isBadge, isSearchable, labelLength, placeholderPersist } =
    context

  const { placeholder = 'Selecione', hideSelected } = props

  if (!props.focus) context?.searchable('')

  const renderValue = () => {
    const checked = getLabelsOrValues(getState().raw, 'label')

    if (!checked.length || placeholderPersist) return placeholder

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
    const isDataSelect = getState().raw.length > 0

    if (!isBadge && !props.focus) {
      return (
        <Box noOfLines={1} color={!isDataSelect ? 'gray.500' : 'black'}>
          {renderValue()}
        </Box>
      )
    }

    if (hideSelected && !props.focus) {
      return (
        <Box noOfLines={1} color={!isDataSelect ? 'gray.500' : 'black'}>
          {renderValue()}
        </Box>
      )
    }

    if (isSearchable && props.focus) {
      return <InputSearch placeholder={'Digite para buscar'} />
    }

    if (!isDataSelect) {
      return (
        <Box as="span" color={!isDataSelect ? 'gray.500' : 'black'}>
          {renderValue()}
        </Box>
      )
    }

    return <Badges itens={getLabelsOrValues(getState().raw, 'label')} />
  }

  return (
    <Box pointerEvents={props.focus ? 'all' : 'none'} className="hub-control">
      {renderComponent()}
    </Box>
  )
}

export default memo(Control)
