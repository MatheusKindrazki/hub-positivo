import React, { useCallback, useEffect, useRef } from 'react'

import { DropzoneRef } from 'react-dropzone'

import { useDispatch, useSelector } from 'react-redux'

import { schoolGetAllRequest } from '~/store/modules/school/actions'
import { categoryGetAllRequest } from '~/store/modules/category/actions'
import { accessControlPostRequest } from '~/store/modules/accessControl/actions'

import { toast } from '@psdhub/common/utils'
import {
  FormProps,
  Form,
  Input,
  Button as FormButton,
  Select
} from '@psdhub/common/components/Form'
import Dropzone from '@psdhub/common/components/Dropzone'
import Breadcrumbs from '@psdhub/common/components/Breadcrumbs'
import { Stack } from '@psdhub/common/components/'
import { Box, Text, Button } from '@psdhub/common/components'

import history from '~/services/history'

import solutionInfo from '~/validators/solution/createSolution'
import { getValidationErrors, ValidationError } from '~/validators'

import { selects } from './selectOptions'
import { formatFormData } from '../../utils/formatFormData'
import createOptions from '../../utils/createOptions'

const UpdateSolution: React.FC = () => {
  const dispatch = useDispatch()
  const { loading: alterLoading } = useSelector(
    (state: Store.State) => state.user
  )

  const { categories } = useSelector((state: Store.State) => state.category)
  const { schools } = useSelector((state: Store.State) => state.school)
  const { profileOptions } = useSelector(
    (state: Store.State) => state.permissions
  )

  const categoryOptions = createOptions(categories)
  const schoolOptions = createOptions(schools)
  const formattedProfileOptions = profileOptions.map((option: any) => ({
    label: `${option.perfil} ${option.nivelEnsino}`,
    value: option.id
  }))

  const formRef = useRef<FormProps>(null)
  const dropRef = useRef<DropzoneRef>(null)

  useEffect(() => {
    dispatch(categoryGetAllRequest())
    dispatch(schoolGetAllRequest())
  }, [dispatch])

  const handleSubmit = useCallback(
    async data => {
      formRef?.current?.setErrors({})
      try {
        await solutionInfo.validate(data, { abortEarly: false })

        const formattedData = formatFormData(data, undefined, {
          profilePermissions: {
            old: [],
            new: data.profiles
          },
          schoolsPermissions: {
            old: [],
            new: data.schools
          }
        })

        return dispatch(accessControlPostRequest(formattedData))
      } catch (err) {
        console.log(err)
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err)
          formRef?.current?.setErrors(errors)
          return
        }
        return toast.error(
          'Algo deu errado, Verifique seus dados e tente novamente!'
        )
      }
    },
    [dispatch]
  )

  return (
    <Box p={['4', '6']} mt={['0', '4']} w="100%">
      <Breadcrumbs
        data={[
          { title: 'Controle de Acessos', href: '/#/controle-de-acessos' },
          { title: 'Adicionar Solução' }
        ]}
      />

      <Box w={['100%', '45%']} m="auto" mt="12">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Box d="flex" flexDir="column" mb="6">
            <Input
              mb="5"
              label="Titulo"
              name="nome"
              backgroundColor="white"
              placeholder="Digite aqui o título da solução"
            />

            <Input
              mb="5"
              label="Descriçao"
              name="descricao"
              backgroundColor="white"
              placeholder="Digite uma breve descrição para ajudar os usuários a entenderem a função desta solução"
            />

            <Input
              label="Link"
              name="link"
              backgroundColor="white"
              placeholder="Insira o Link de acesso a solução"
            />
          </Box>

          <Box>
            <Text color="blue.500">Ícone</Text>
            <Dropzone ref={dropRef} />
          </Box>
          <Stack
            direction={['column', 'row']}
            wrap="wrap"
            justifyContent="space-between"
            mt="5"
          >
            {selects(
              categoryOptions,
              schoolOptions,
              formattedProfileOptions
            ).map(select => {
              return (
                <Box
                  key={select.name}
                  w={select.name === 'schools' ? '100%' : '48.5%'}
                  ml="0px"
                >
                  <Select mb="4" variant="secondary" {...select} />
                </Box>
              )
            })}
          </Stack>
          <Box
            mt="9"
            flexDir={['row', 'row-reverse']}
            flexWrap={['wrap', 'nowrap']}
            d="flex"
            w="100%"
            justifyContent={['space-between', 'flex-start']}
          >
            <FormButton
              flexGrow={[2, 1]}
              height="14"
              m="0"
              mb={['3', '0']}
              marginLeft={['0', '3']}
              maxWidth={['100%', '32']}
              fontWeight="500"
              textTransform="uppercase"
              colorScheme="blue"
              isLoading={alterLoading}
            >
              Adicionar
            </FormButton>
            <Button
              borderColor="gray.500"
              height="14"
              width={['48.4%', '32']}
              variant="outline"
              fontWeight="500"
              textTransform="uppercase"
              color="gray"
              onClick={() => history.push('/controle-de-acessos')}
            >
              Cancelar
            </Button>
          </Box>
        </Form>
      </Box>
    </Box>
  )
}

export default UpdateSolution
