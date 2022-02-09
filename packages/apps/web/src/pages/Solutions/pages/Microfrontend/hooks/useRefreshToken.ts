import { useCallback, useEffect } from 'react'

import { store } from '~/store'

import { useTheme } from '@psdhub/common/layout/styles'

import refreshToken from '~/middlewares/refreshToken'

import communicatorMCF from '../communicator'

const HUB_REFRESH_KEY = '@hub-refresh-token'

function useRefreshToken(): void {
  const { colors } = useTheme()

  const refresh = useCallback(async () => {
    const { getState, dispatch } = store
    const { exp, reduced_token, refresh_token } = getState().auth

    const isTokenRenewed = await refreshToken({
      exp,
      reduced_token,
      refresh_token,
      dispatch
    })

    if (!isTokenRenewed) return

    communicatorMCF(getState(), colors)
  }, [colors])

  useEffect(() => {
    document.addEventListener(HUB_REFRESH_KEY, refresh)

    return () => {
      document.removeEventListener(HUB_REFRESH_KEY, refresh)
    }
  }, [refresh])
}

export default useRefreshToken
