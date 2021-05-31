import { useCallback } from 'react'

import { useLocation } from 'react-router-dom'

interface Pages {
  accessControl: {
    trash?: string
    submitSolution?: string
    home?: string
  }
}
type ColorsByLocation = {
  color: () => Pages
}

const useColorByLocation = (): ColorsByLocation => {
  const { pathname } = useLocation()

  const color = useCallback((): Pages => {
    switch (pathname) {
      case '/controle-de-acessos':
        return {
          accessControl: {
            trash: 'gray.500',
            home: 'blue.500'
          }
        }
      case '/controle-de-acessos/lixeira':
        return {
          accessControl: {
            trash: 'blue.500',
            home: 'gray.500'
          }
        }
      default:
        return {
          accessControl: {
            trash: 'blue.500',
            home: 'blue.500'
          }
        }
    }
  }, [pathname])

  return { color }
}

export { useColorByLocation }
