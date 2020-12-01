import React, { useEffect } from 'react'

import { useParams } from 'react-router'

import history from '~/services/history'

interface Auth {
  guid?: string
}

const Inject: React.FC = () => {
  const params = useParams<Auth>()

  useEffect(() => {
    // history.push('/')
  }, [])

  return <div />
}

export default Inject
