import { useCallback, useEffect } from 'react'

import { store } from '~/store'

import { useTheme } from '@psdhub/common/layout/styles'

import refreshToken from '~/middlewares/refreshToken'

import communicatorMCF from '../communicator'

const HUB_REFRESH_KEY = '@hub-refresh-token'

function useRefreshToken(): void {
  const { colors } = useTheme()

  const refresh = useCallback(async () => {
    const token = await refreshToken()

    if (!token) return

    communicatorMCF(store.getState(), colors)
  }, [colors])

  useEffect(() => {
    document.addEventListener(HUB_REFRESH_KEY, refresh)

    return () => {
      document.removeEventListener(HUB_REFRESH_KEY, refresh)
    }
  }, [refresh])
}

export default useRefreshToken
