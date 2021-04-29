import React, { useRef, useCallback, useState } from 'react'

import { store } from '~/store'

import { Input, Form, FormProps, Button } from '@psdhub/common/components/Form'
import { Heading, Box } from '@psdhub/common/components'
import { apiAuthProduct } from '@psdhub/api'

const DevHub: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const formRef = useRef<FormProps>(null)

  const handleSubmit = useCallback(async data => {
    setLoading(true)

    const auth = store.getState().auth
    const profile = store.getState().profile
    const user = store.getState().user
    const { level } = store.getState().educationalStage

    const authTheProduct = {
      product: 'easyauth-login',
      token: auth.token,
      reduced_token: auth.reduced_token,
      logged_in: {
        school: {
          name: user.school?.label,
          id: user.school?.value,
          class: level
        },
        profile: profile.guid,
        user_id: user.info?.integration_id || user.info?.id
      },
      expire_in: auth.exp
    }

    const response = await apiAuthProduct.post(
      'api/TokenStorage',
      authTheProduct,
      {
        headers: {
          Authorization: `Bearer ${auth.reduced_token}`
        }
      }
    )

    const produceUrl = `${data.url}/${response.data}`

    window.open(produceUrl, '_blank')

    setLoading(false)
  }, [])

  return (
    <Box
      w="100%"
      minH="calc(100vh - 90px)"
      d="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="100%" maxW="md">
        <Heading fontWeight="normal" fontSize="2xl" textAlign="center" mb="8">
          EasyAuth / Hub Digital
        </Heading>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            backgroundColor="white"
            name="url"
            type="text"
            data-testid="email"
            placeholder="Url para redirecionamento"
            defaultValue="http://localhost:300/#/auth"
            mb="5"
          />

          <Button isLoading={loading}>Entrar na solução</Button>
        </Form>
      </Box>
    </Box>
  )
}

export default DevHub
