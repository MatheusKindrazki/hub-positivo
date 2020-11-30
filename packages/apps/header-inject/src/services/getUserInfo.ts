import { apiAuthProduct } from '@hub/api'

import { toast } from '@chakra-ui/react'

export interface UserInfoProps {
  token: string
  product: string
  logged_in: {
    school: {
      name: string
      id: string
    }
    profile: string
  }
  expire_in: number
}

const getUserInfo = async (guid: string): Promise<UserInfoProps> => {
  const response = await apiAuthProduct.get('/api/TokenStorage', {
    guid
  })

  if (!response.ok) {
    throw new Error()
  }

  return response.data as UserInfoProps
}

export default getUserInfo
