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
        width: '100%',
        height: '100vh'
      }}
    ></iframe>
  )
}

export default Iframe
