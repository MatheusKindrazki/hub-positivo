import React, { useState, useEffect } from 'react'
import { useCallback } from 'react'

import { useToast } from '@hub/common/hooks'

import Header from '../../components/Header'
import { useAuth } from '../../hooks/auth'
import { CardProduct, getCards } from '../../services/getCards'

const HeaderPage: React.FC = () => {
  const toast = useToast()

  const [cards, setCards] = useState([] as CardProduct[])

  const { profile, levelEducation } = useAuth()

  const handlePush = useCallback(() => {
    console.log('Enviando para a url')
  }, [])

  useEffect(() => {
    async function getInfos(): Promise<void> {
      if (!profile) return
      try {
        const response = await getCards({
          profile: profile,
          levelEducation: levelEducation
        })

        setCards(response)
      } catch (error) {
        toast({
          title: 'Erro ao buscar soluções!',
          description: 'Tente novamente mais tarde',
          status: 'error',
          duration: 4000
        })
      }
    }

    getInfos()
  }, [levelEducation, profile, toast])

  return <Header cards={cards} handlePush={handlePush} />
}

export default HeaderPage
