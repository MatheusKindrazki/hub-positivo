/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/react-in-jsx-scope */
import React, { Suspense } from 'react'

const withSuspense = (Component: any) => {
  return (props: any) => (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  )
}

export default withSuspense
