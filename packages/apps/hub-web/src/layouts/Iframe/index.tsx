import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { BarLoader } from '@hub/common/components'
import createSlug from '@hub/common/utils/createSlug'

import { preAuth } from '~/store/modules/authProduct/actions'
import { CardProduct } from '~/store/modules/products/types'

import Header from './components/Header'

const Iframe: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const { data } = useSelector((state: Store.State) => state.products)

  const { loading } = useSelector((state: Store.State) => state.global)
  const handlePlush = useCallback(
    data => {
      const slug = createSlug(data.nome)

      console.log(data)

      dispatch(
        preAuth({
          product: slug,
          url: data.url,
          tipoRenderizacao: data.tipoRenderizacao
        })
      )
    },
    [dispatch]
  )
  return (
    <>
      <BarLoader width="100%" height="4px" loading={loading} />
      <Header handlePush={handlePlush} cards={data as CardProduct[]} />
      {children}
    </>
  )
}

export default Iframe