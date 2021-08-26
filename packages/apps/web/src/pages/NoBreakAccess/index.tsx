import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { documentTitle } from '@psdhub/common/utils'

import history from '~/services/history'

const NoBreakAccess: React.FC = () => {
  documentTitle('Acesso Alternativo')

  const { nobreak } = useSelector((state: Store.State) => state.noBreakAccess)

  useEffect(() => {
    if (nobreak) return

    history.push('/')
  }, [nobreak])

  // silence is golden
  return <div />
}

export default NoBreakAccess
