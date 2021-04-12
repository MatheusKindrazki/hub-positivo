import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { CardProduct } from '~/store/modules/products/types'
import { preAuth } from '~/store/modules/authProduct/actions'

import createSlug from '@psdhub/common/utils/createSlug'
import { BarLoader } from '@psdhub/common/components'

import { useSendGlobalInfo } from '~/hooks/useSendGlobalInfo'

import Header from './components/Header'

const Iframe: React.FC = ({ children }) => {
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
