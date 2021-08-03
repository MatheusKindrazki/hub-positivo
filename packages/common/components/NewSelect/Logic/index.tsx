import React, { useLayoutEffect } from 'react'

import { useOnClickOutside } from '@psdhub/common/hooks'

import syncPropsContext from '../utils/syncPropsContext'
import markCheckedItens from '../utils/markCheckedItens'
import { SelectProps, SelectRefProps } from '../types'
import useConnectRefToContext from '../hooks/useConnectRefToContext'
import { useSelect } from '../context'

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
    markCheckedItens(value || [], context)
  }, [context, value])

  syncPropsContext(props, context)
  useOnClickOutside(containerRef, onClose, 'click')
  useConnectRefToContext(context, selectRef)

  return <>{children}</>
}

export default LogicScope
