import React, { useCallback, useEffect } from 'react'

import { debounce } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'

import { signOut } from '~/store/modules/auth/actions'

import { BarLoader } from '@psdhub/common/components'

import setUserProperties from '~/services/mixpanel/setProperties'
import history from '~/services/history'

import Header from '~/components/Header'

const dispatchEvent = debounce(() => setUserProperties(), 1000)

const Iframe: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => dispatchEvent())

  const { loading } = useSelector((state: Store.State) => state.global)

  const { school } = useSelector((state: Store.State) => state.user)

  const handlePush = useCallback(
    async (to: string) => {
      if (to === '/login') {
        dispatch(signOut())
      }
      setTimeout(() => history.push(to), 500)
    },
    [dispatch]
  )

  return (
    <>
      <BarLoader height="4px" loading={loading} />
      <Header handlePush={handlePush} schoolName={school?.label as string} />
      {children}
    </>
  )
}

export default Iframe
