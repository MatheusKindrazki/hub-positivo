import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { BarLoader } from '@hub/common/components'
import createSlug from '@hub/common/utils/createSlug'

import { useSendGlobalInfo } from '~/hooks/useSendGlobalInfo'
import { useSentry } from '~/hooks/useSentry'
import { preAuth } from '~/store/modules/authProduct/actions'
import { CardProduct } from '~/store/modules/products/types'

import Header from './components/Header'

const Iframe: React.FC = ({ children }) => {
  useSentry()
  useSendGlobalInfo()

  const dispatch = useDispatch()

  const { data } = useSelector((state: Store.State) => state.products)
  const { loading } = useSelector((state: Store.State) => state.global)

  const handlePlush = useCallback(
    data => {
      const slug = createSlug(data.nome)

      dispatch(
        preAuth({
          product: slug,
          name: data.nome,
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
