import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'

import history from '~/services/history'

const Iframe: React.FC = () => {
  const { frameUrl } = useSelector((state: Store.State) => state.products)

  useEffect(() => {
    if (!frameUrl) {
      history.push('/')
    }
  }, [frameUrl])

  return (
    <iframe
      src={frameUrl}
      frameBorder="0"
      style={{
        marginTop: 72,
        width: '100%',
        height: 'calc(100vh - 72px)'
      }}
    ></iframe>
  )
}

export default Iframe
