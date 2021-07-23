import React, { useImperativeHandle } from 'react'

import markCheckedItens from '../utils/markCheckedItens'
import { SelectRefProps } from '../types'
import { SelectContextProps } from '../context'

type RefProps = React.ForwardedRef<SelectRefProps>
type ContextProps = SelectContextProps

function useConnectRefToContext(context: ContextProps, ref: RefProps): void {
  useImperativeHandle(ref, () => ({
    value: context.state?.raw || [],
    getValue: () => {
      const data = context.state

      return data
    },
    setValue: checked => {
      markCheckedItens(checked, context)
    }
  }))
}

export default useConnectRefToContext
