import React, { useCallback, useEffect } from 'react'

import { debounce } from 'lodash'

import { useSelector } from 'react-redux'

import { BarLoader } from '@psdhub/common/components'

import setUserProperties from '~/services/mixpanel/setProperties'
import history from '~/services/history'

import Header from '~/components/Header'

const dispatchEvent = debounce(() => setUserProperties(), 1000)

const Iframe: React.FC = ({ children }) => {
  useEffect(() => dispatchEvent())

  const { loading } = useSelector((state: Store.State) => state.global)

  const { school } = useSelector((state: Store.State) => state.user)

  const handleGoBack = useCallback(async () => {
    setTimeout(() => history.push('/'), 500)
  }, [])

  return (
    <>
      <BarLoader height="4px" loading={loading} />
      <Header
        handleGoBack={handleGoBack}
        schoolName={school?.label as string}
      />
      {children}
    </>
  )
}

export default Iframe
