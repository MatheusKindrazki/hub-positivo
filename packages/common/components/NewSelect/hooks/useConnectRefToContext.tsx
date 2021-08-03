import React, { useImperativeHandle } from 'react'

import markCheckedItens from '../utils/markCheckedItens'
import { SelectRefProps } from '../types'
import { SelectContextProps } from '../context/types'

type RefProps = React.ForwardedRef<SelectRefProps>
type ContextProps = SelectContextProps

function useConnectRefToContext(context: ContextProps, ref: RefProps): void {
  useImperativeHandle(ref, () => {
    return {
      getValue: () => context.getState(),
      setValue: checked => {
        markCheckedItens(checked, context)
      }
    }
  })
}

export default useConnectRefToContext
