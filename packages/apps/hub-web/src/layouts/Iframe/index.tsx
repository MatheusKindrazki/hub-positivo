import React, { useCallback } from 'react'

import { useSelector } from 'react-redux'

import { CardProduct } from '~/store/modules/products/types'

import Header from './components/Header'

const Iframe: React.FC = ({ children }) => {
  const { data } = useSelector((state: Store.State) => state.products)

  const handlePlush = useCallback(() => {
    console.log('redirect')
  }, [])
  return (
    <>
      <Header handlePush={handlePlush} cards={data as CardProduct[]} />
      {children}
    </>
  )
}

export default Iframe
