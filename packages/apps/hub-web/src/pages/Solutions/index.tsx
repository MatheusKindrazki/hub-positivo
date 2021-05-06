import React, { useEffect, useState, memo } from 'react'

import { useSelector } from 'react-redux'

import documentTitle from '@psdhub/common/utils/documentTitle'
import { Box } from '@psdhub/common/components'

import getCardInformation from '~/hooks/useCardInformation'

import { Container } from './styles'
import MicrofrontendPage from './pages/Microfrontend'
import IframePage from './pages/Iframe'
import Loading from './components/Loading'

window.firstCallMCF = false

const Solutions: React.FC = () => {
  const [loading, setLoading] = useState(true)

  const { productName, productData, mcf } = useSelector(
    (state: Store.State) => state.authProduct
  )

  useEffect(() => {
    documentTitle(productName || 'Carregando Solução')
  }, [productData, productName])

  if (!productData || !window.firstCallMCF) {
    window.firstCallMCF = true
    getCardInformation()
  }

  const RenderPage = mcf ? MicrofrontendPage : IframePage

  return (
    <Container className="hub-solution-container">
      <Box className="hub-login-container">
        <Loading loading={loading} />
      </Box>
      {productData && (
        <RenderPage data={productData} onLoaded={() => setLoading(false)} />
      )}
    </Container>
  )
}

export default memo(Solutions)
