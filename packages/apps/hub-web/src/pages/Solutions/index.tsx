import React, { useEffect, useState, memo, useMemo } from 'react'

import { generate } from 'randomstring'

import { useSelector } from 'react-redux'

import { postInformations } from '@psdhub/helpers'
import documentTitle from '@psdhub/common/utils/documentTitle'
import { Box } from '@psdhub/common/components'

import { ReturnScripts } from '~/orchestrator'
import getCardInformation from '~/hooks/useCardInformation'

import LoadModules from './components/LoadModules'

const Solutions: React.FC = () => {
  postInformations('Dado vindo do hub 123' as any)

  const { productName, productData } = useSelector(
    (state: Store.State) => state.authProduct
  )

  const [mcf, setMcf] = useState({} as ReturnScripts)

  useEffect(() => {
    documentTitle(productName || 'Carregando Solução')

    if (productData) {
      setMcf(productData as ReturnScripts)
    }
  }, [productData, productName])

  if (!productData) {
    getCardInformation()
  }

  const hashUrl = useMemo(() => {
    return generate(10)
  }, [])

  return (
    <>
      <Box
        mt={['41px', '73px']}
        key={String(productName)}
        id={mcf.element_id}
      ></Box>
      {mcf?.scripts?.map((s, i) => (
        <LoadModules hash={hashUrl} key={i} {...s} />
      ))}
    </>
  )
}

export default memo(Solutions)
