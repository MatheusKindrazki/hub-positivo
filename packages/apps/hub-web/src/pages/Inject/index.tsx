import React from 'react'

import { useParams } from 'react-router'

interface Auth {
  guid?: string
}

const Inject: React.FC = () => {
  const params = useParams<Auth>()
  return <div />
}

export default Inject
