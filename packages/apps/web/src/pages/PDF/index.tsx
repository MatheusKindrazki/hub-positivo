import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'

import documentTitle from '@psdhub/common/utils/documentTitle'

import getCardInformation from '~/hooks/useCardInformation'

import WebViewer from './components/Webviewer'

window.firstCallMCF = false

const PdfProject: React.FC = () => {
  const { productName, productData } = useSelector(
    (state: Store.State) => state.authProduct
  )

  useEffect(() => {
    documentTitle(productName || 'Carregando Solução')

    return () => {
      window.firstCallMCF = false
    }
  }, [productData, productName])

  if (!productData && !window.firstCallMCF) {
    window.firstCallMCF = true

    getCardInformation('literatura-ctpm')
  }

  if (!productData) return null

  return <WebViewer url={productData as string} />
}

export default PdfProject
