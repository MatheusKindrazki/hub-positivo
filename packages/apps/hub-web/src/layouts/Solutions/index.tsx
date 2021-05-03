import React, { useCallback, useEffect } from 'react'

import { debounce } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'

import { CardProduct } from '~/store/modules/products/types'
import { preAuth } from '~/store/modules/authProduct/actions'

import gsc, { removeGsc } from '@psdhub/gsc'
import createSlug from '@psdhub/common/utils/createSlug'
import { BarLoader } from '@psdhub/common/components'

import setUserProperties from '~/services/mixpanel/setProperties'

import Header from './components/Header'

const dispatchEvent = debounce(() => setUserProperties(), 1500)

const Iframe: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => dispatchEvent())

  useEffect(() => {
    gsc()

    return () => {
      removeGsc()
    }
  }, [])

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
