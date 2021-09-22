/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect } from 'react'

import { useOnClickOutside } from '@psdhub/common/hooks'

import syncPropsContext from '../utils/syncPropsContext'
import markCheckedItens from '../utils/markCheckedItens'
import { SelectProps, SelectRefProps } from '../types'
import useConnectRefToContext from '../hooks/useConnectRefToContext'
import { useSelect } from '../context'
import useKeyPress from '../../../hooks/useKeyPress'

interface LogicScopeProps extends SelectProps {
  value?: string[]
  containerRef: React.RefObject<HTMLDivElement>
  selectRef: React.ForwardedRef<SelectRefProps>
  onClose(): void
}

const LogicScope: React.FC<LogicScopeProps> = ({ children, ...props }) => {
  const { value, containerRef, onClose, selectRef } = props

  const context = useSelect()

  useLayoutEffect(() => {
    if (value?.length) {
      markCheckedItens(value, context)
    }
  }, [value])

  syncPropsContext(props, context)
  useOnClickOutside(containerRef, onClose, 'click')
  useConnectRefToContext(context, selectRef)

  useKeyPress(containerRef, () => context.onInputFocus())

  return <>{children}</>
}

export default LogicScope
