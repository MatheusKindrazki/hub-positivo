import React from 'react'

import { useLocation } from 'wouter'
// import { Container } from './styles';

const SignIn: React.FC = () => {
  const [, setLocation] = useLocation()

  return (
    <>
      <h1>Login</h1>

      <button type="button" onClick={() => setLocation('/home')}>
        {' '}
        home
      </button>
    </>
  )
}

export default SignIn
