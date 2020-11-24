import React from 'react'

import SignIn from '~/pages/Auth/SignIn'
import Home from '~/pages/Home'

import Route from './Route'

const Routes: React.FC = () => {
  return (
    <>
      <Route path="/" component={SignIn} />
      <Route path="/home" component={Home} isPrivate />
    </>
  )
}

export default Routes
