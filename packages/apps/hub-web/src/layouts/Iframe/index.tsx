import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { BarLoader } from '@hub/common/components'

import { authProductRequest } from '~/store/modules/authProduct/actions'
import { CardProduct } from '~/store/modules/products/types'
import createSlug from '~/utils/createSlug'

import Header from './components/Header'

const apiArvore = ['Gestão Escolar Sae+C', 'Árvore Livros']

const Iframe: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const { data } = useSelector((state: Store.State) => state.products)

  const { loading } = useSelector((state: Store.State) => state.global)
  const handlePlush = useCallback(
    data => {
      const slug = createSlug(data.nome)

      if (apiArvore.includes(data.nome)) {
        window.location.assign(data.url)

        return
      }

      dispatch(
        authProductRequest({
          url: data.url,
          integration_type: data.integration_type,
          product: slug
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
