import React, { useRef, useState, useCallback, useContext } from 'react'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Heading, Text, Button } from '@hub/common/components'
import {
  Input,
  Button as FormButton,
  Form,
  FormProps
} from '@hub/common/components/Form'
import { Lock, User, Eye, EyeSlash } from '@hub/common/components/Icons'
import { toast } from '@hub/common/utils'
import documentTitle from '@hub/common/utils/documentTitle'

import lscache from 'lscache'
import ReCAPTCHA from 'react-google-recaptcha'
import { useHistory } from 'react-router-dom'

import ModalSupportContext from '~/components/ModalSupport/context'

import useQuery from '~/hooks/useQuery'
import { signInRequest } from '~/store/modules/auth/actions'
import { handleCaptcha, checkForStrikes } from '~/utils/reCaptcha'
import { ValidationError, getValidationErrors } from '~/validators'
import signInValidator from '~/validators/auth/signIn'

const SignIn: React.FC = () => {
  documentTitle('Entrar')

  const search = useQuery()
  const history = useHistory()
  const dispatch = useDispatch()

  const formRef = useRef<FormProps>(null)

  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [view, setView] = useState(false)
  const [disableSubmit, setDisableSubmit] = useState(false)

  const redirectTo = search.get('redirect') || undefined

  const { onOpen } = useContext(ModalSupportContext)

  const { loading, signInStrike } = useSelector(
    (state: Store.State) => state.auth
  )

  useEffect(() => {
    lscache.flushExpired()
    if (signInStrike) {
      setDisableSubmit(checkForStrikes())
    }
  }, [signInStrike])

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({})

      try {
        await signInValidator.validate(data, {
          abortEarly: true
        })

        dispatch(
          signInRequest({
            ...data,
            redirect: redirectTo
          })
        )
      } catch (err) {
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err)

          formRef?.current?.setErrors(errors)

          return
        }
        toast.error('Algo deu errado, Verifique seus dados e tente novamente!')
      }
    },
    [dispatch, redirectTo]
  )

  const handleRecaptchaSubmit = useCallback(async token => {
    const validate = await handleCaptcha(token)

    if (!validate) return

    recaptchaRef.current?.reset()
    formRef.current?.submitForm()
  }, [])

  const handleForgotPasswordLink = () => {
    history.push('/forgot-password')
  }
  return (
    <Box p="6">
      <Heading color="black" fontSize="xl" mb="2">
        Entrar
      </Heading>
      <Text fontSize="md" color="gray.500" mb="8">
        Insira seus dados de acesso para começar
      </Text>

      <Form ref={formRef} onSubmit={handleSubmit} data-testid="submit-form">
        <Input
          name="username"
          type="text"
          data-testid="email"
          placeholder="Digite seu usuário"
          iconLeft={<Box as={User} color="blue.500" size="18px" />}
          mb="5"
        />
        <Input
          name="password"
          type={!view ? 'password' : 'text'}
          placeholder="Digite sua senha"
          autoComplete="current-password"
          data-testid="password"
          iconRight={
            <Box
              as={view ? Eye : EyeSlash}
              color="gray.500"
              size="19px"
              onClick={() => setView(!view)}
            />
          }
          iconLeft={<Box as={Lock} color="blue.500" size="21px" />}
        />

        <FormButton
          textTransform="uppercase"
          data-testid="submit-button"
          isLoading={loading}
          type={disableSubmit ? 'button' : 'submit'}
          onClick={
            disableSubmit
              ? () => recaptchaRef.current?.executeAsync()
              : undefined
          }
          mb="6"
        >
          Entrar
        </FormButton>
      </Form>
      <Button
        variant="link"
        colorScheme="blue"
        size="lg"
        width="100%"
        textTransform="uppercase"
        fontSize="0.875rem"
        mb="8"
        onClick={handleForgotPasswordLink}
      >
        Esqueci minha senha
      </Button>
      <Button
        variant="link"
        colorScheme="blue"
        size="lg"
        width="100%"
        textTransform="uppercase"
        fontSize="0.875rem"
        mb="2"
        onClick={onOpen}
      >
        Preciso de ajuda
      </Button>
      <ReCAPTCHA
        theme="light"
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
        children
        onChange={handleRecaptchaSubmit}
      />
    </Box>
  )
}

export default SignIn
