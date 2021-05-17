import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useLocation } from 'react-router'
import { DropzoneRef } from 'react-dropzone'

import { useDispatch, useSelector } from 'react-redux'

import { AccessControlPutData } from '~/store/modules/accessControl/types'
import { accessControlPutRequest } from '~/store/modules/accessControl/actions'

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
import { Box, Text, Stack, Button, BarLoader } from '@psdhub/common/components'

import history from '~/services/history'

import solutionInfo from '~/validators/solution/createSolution'
import { getValidationErrors, ValidationError } from '~/validators'

import { ModalDeleteSolution, ModalHandler } from './ModalDelete'
import { selects } from '../CreateSolution/selectOptions'
import getSolutionBySlug, {
  SolutionWithCategory
} from '../../utils/getSolutionBySlug'
import getSlugFromURL from '../../utils/getSlugFromURL'
import { formatFormData } from '../../utils/formatFormData'
import createOptions from '../../utils/createOptions'

const UpdateSolution: React.FC = () => {
  const [solution, setSolution] = useState<SolutionWithCategory>()

  const { pathname } = useLocation()

  const dispatch = useDispatch()

  const { data: categoryArr } = useSelector(
    (state: Store.State) => state.solutions
  )
  const { categories } = useSelector((state: Store.State) => state.category)
  const { schools } = useSelector((state: Store.State) => state.school)
  const { loading } = useSelector((state: Store.State) => state.global)
  const {
    schoolPermissions: oldSchoolPermissions,
    profilePermissions: oldProfilePermissions
  } = useSelector((state: Store.State) => state.permissions)

  console.log({ oldSchoolPermissions }, { oldProfilePermissions })

  const categoryOptions = createOptions(categories)
  const schoolOptions = createOptions(schools)

  const formRef = useRef<FormProps>(null)
  const dropRef = useRef<DropzoneRef>(null)
  const modalRef = useRef<ModalHandler>(null)

  useEffect(() => {
    const solutionSlug = getSlugFromURL(pathname)
    console.log('soluao recebida em updatesolution', { solution })

    if (!categoryArr || categoryArr?.length === 0) {
      return history.push('/controle-de-acessos')
    }

    if (solutionSlug && !solution) {
      setSolution(getSolutionBySlug(categoryArr, solutionSlug))
    }

    if (solution) {
      formRef.current?.setData({
        nome: solution?.solution.nome,
        descricao: solution?.solution.descricao,
        link: solution.solution.link,
        idCategoria: solution?.category
      })
    }
  }, [categoryArr, dispatch, pathname, solution])

  const handleSubmit = useCallback(
    async data => {
      formRef?.current?.setErrors({})
      try {
        await solutionInfo.validate(data, { abortEarly: false })

        const formattedData: AccessControlPutData = formatFormData(
          data,
          solution as SolutionWithCategory,
          {
            profilePermissions: {
              old: oldProfilePermissions,
              new: data.profiles
            },
            schoolsPermissions: {
              old: oldSchoolPermissions,
              new: data.schools
            }
          }
        )

        return dispatch(accessControlPutRequest(formattedData))
      } catch (err) {
        console.log({ err })
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err)
          formRef?.current?.setErrors(errors)
        }
        return toast.error(
          'Algo deu errado, Verifique seus dados e tente novamente!'
        )
      }
    },
    [solution, oldProfilePermissions, oldSchoolPermissions, dispatch]
  )

  const openModal = useCallback(() => {
    modalRef.current?.onOpen()
  }, [])

  return (
    <>
      <BarLoader width="100%" height="0.25rem" loading={loading} />
      <Box p={['4', '6']} mt={['0', '4']} w="100%">
        <Breadcrumbs
          data={[
            { title: 'Controle de Acessos', href: '/#/controle-de-acessos' },
            { title: 'Editar Solução' }
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
                label="Descricao"
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
              {selects(categoryOptions, schoolOptions).map(select => {
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
                isLoading={loading}
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
              <Button
                ml="8px"
                onClick={openModal}
                height="14"
                width={['48.4%', '28']}
                variant="outline"
                fontWeight="500"
                textTransform="uppercase"
                colorScheme="red"
                color="red"
                marginRight={['0', 'auto']}
              >
                Excluir
              </Button>
            </Box>
          </Form>
        </Box>
        <ModalDeleteSolution
          ref={modalRef}
          solutionId={solution?.solution.id}
        />
      </Box>
    </>
  )
}

export default UpdateSolution
