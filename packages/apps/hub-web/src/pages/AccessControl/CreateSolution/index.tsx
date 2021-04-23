import React, { useRef } from 'react'

import classNames from 'classnames'

import { useSelector } from 'react-redux'

// import { useToast } from '@psdhub/common/hooks'
import { FormProps, Form, Input, Button } from '@psdhub/common/components/Form'
import BarLoader from '@psdhub/common/components/BarLoader'
import { Box, Text, Select, Stack } from '@psdhub/common/components'

// import { getValidationErrors, ValidationError } from '~/validators'

const CreateSolution: React.FC = () => {
  // const dispatch = useDispatch()
  // const { error } = useToast()

  const { loading } = useSelector((state: Store.State) => state.forgotPassword)
  const { loading: alterLoading } = useSelector(
    (state: Store.State) => state.user
  )

  const formRef = useRef<FormProps>(null)

  // const handleSubmit = useCallback(
  //   async data => {
  //     formRef?.current?.setErrors({})
  //     try {
  //       await passValidation.validate(data, {
  //         abortEarly: false
  //       })

  //       dispatch(
  //         forgotPasswordRequest({
  //           newPassword: data.password,
  //           pin: token
  //         })
  //       )
  //     } catch (err) {
  //       if (err instanceof ValidationError) {
  //         const errors = getValidationErrors(err)

  //         formRef?.current?.setErrors(errors)

  //         return
  //       }

  //       error('Algo deu errado, Verifique seus dados e tente novamente!')
  //     }
  //   },
  //   [dispatch, error, token]
  // )

  return (
    <Box p="6" mt="5rem">
      <BarLoader
        loading={loading}
        css={`
          position: absolute;
          top: 0;
          left: 0;
        `}
        height="5px"
        color="var(--hub-base-color)"
      />
      <Text
        fontSize="x-large"
        color="grey.100"
        ml="14rem"
        mb="2.8rem"
        letterSpacing="wider"
      >
        {'Controle de acessos > Adicionar Solução'}
      </Text>

      <Box w="48rem" m="auto">
        <Form
          ref={formRef}
          onSubmit={data => console.log(data)}
          className={classNames({
            disabled: loading
          })}
        >
          <Box d="flex" flexDir="column">
            <Text color="blue.500">Titulo</Text>
            <Input name="teste" backgroundColor="white" />
            <Text color="blue.500">Descricao</Text>
            <Input name="teste" backgroundColor="white" />
          </Box>

          <Stack direction={'row'} justifyContent="space-between" mt="1.6rem">
            <Box width="48.5%">
              <Text color="blue.500">Categoria</Text>
              <Select variant="normal" name="teste" m="auto"></Select>
            </Box>
            <Box width="48.5%">
              <Text color="blue.500">Perfis</Text>
              <Select variant="normal" name="teste" m="auto"></Select>
            </Box>
          </Stack>

          <Stack direction={'row'} justifyContent="space-between" mt="1.6rem">
            <Box width="48.5%">
              <Text color="blue.500">Segmentos</Text>
              <Select variant="normal" name="teste" m="auto"></Select>
            </Box>
            <Box width="48.5%">
              <Text color="blue.500">Abrir em...</Text>
              <Select variant="normal" name="teste" m="auto"></Select>
            </Box>
          </Stack>

          <Stack direction={'row'} justifyContent="space-between" mt="1.6rem">
            <Box width="48.5%">
              <Text color="blue.500">Escolas</Text>
              <Select variant="normal" name="teste" m="auto"></Select>
            </Box>
            <Box width="48.5%" alignSelf="flex-end">
              <Select variant="normal" name="teste" m="auto"></Select>
            </Box>
          </Stack>

          <Box flexDir="row-reverse" d="flex">
            <Button
              variant="outline"
              maxWidth="8rem"
              background="grey.500"
              textColor="grey"
            >
              Cancelar
            </Button>
            <Button isLoading={alterLoading} maxWidth="8rem">
              Adicionar
            </Button>
          </Box>
        </Form>
      </Box>
    </Box>
  )
}

export default CreateSolution
