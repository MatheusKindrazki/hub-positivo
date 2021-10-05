import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useLocation } from 'react-router'

import { useDispatch, useSelector } from 'react-redux'

import { Solution, Option } from '~/store/modules/solutions/types'
import {
  accessControlPutRequest,
  accessControlPostRequest
} from '~/store/modules/accessControl/actions'

import { toast } from '@psdhub/common/utils'
import {
  FormProps,
  Form,
  Input,
  Button as FormButton,
  Select,
  Dropzone
} from '@psdhub/common/components/Form'
import Breadcrumbs from '@psdhub/common/components/Breadcrumbs'
import { Box, Stack, Button, BarLoader } from '@psdhub/common/components'

import history from '~/services/history'

import {
  updateSolution,
  createSolution
} from '~/validators/solution/submitSolution'
import { getValidationErrors, ValidationError } from '~/validators'

import { formatFormData } from './utils/formatFormData'
import createOptions from './utils/createOptions'
import autocompleteFormData from './utils/autocompleteFormData'
import SchoolList, { SchoolListHandler } from './SchoolList'
import { ModalDeleteSolution, ModalHandler } from './ModalDelete'
import { selects } from './formSelects'
import getSolutionBySlug from '../../utils/getSolutionBySlug'

const SubmitSolution: React.FC = () => {
  const [solution, setSolution] = useState<Solution>()
  const { pathname } = useLocation()
  const page = pathname === '/controle-de-acessos/criar' ? 'criar' : 'editar'

  const dispatch = useDispatch()

  const { publicadas: categoryArr } = useSelector(
    (state: Store.State) => state.solutions
  )
  const { categories } = useSelector((state: Store.State) => state.category)
  const { schools } = useSelector((state: Store.State) => state.school)
  const { loading } = useSelector((state: Store.State) => state.global)
  const { profileOptions } = useSelector(
    (state: Store.State) => state.permissions
  )
  const {
    schoolPermissions: oldSchoolPermissions,
    profilePermissions: oldProfilePermissions
  } = useSelector((state: Store.State) => state.permissions)

  const formattedProfileOptions = createOptions(profileOptions)
  const categoryOptions = createOptions(categories)
  const schoolOptions = createOptions(schools)

  const selectsOptions = {
    profiles: formattedProfileOptions,
    categories: categoryOptions,
    schools: schoolOptions
  }

  const formRef = useRef<FormProps>(null)
  const modalRef = useRef<ModalHandler>(null)
  const schoolListRef = useRef<SchoolListHandler>(null)

  useEffect(() => {
    if (!categoryArr || categoryArr?.length === 0) {
      return history.push('/controle-de-acessos')
    }

    if (!solution) {
      setSolution(getSolutionBySlug(categoryArr, pathname))
    }

    if (solution) {
      autocompleteFormData(solution, formRef, profileOptions)
    }
  }, [categoryArr, dispatch, pathname, profileOptions, solution, formRef])

  const handleSubmit = useCallback(
    async data => {
      formRef?.current?.setErrors({})
      try {
        page === 'criar'
          ? await createSolution.validate(data, { abortEarly: false })
          : await updateSolution.validate(data, { abortEarly: false })

        const permissions = {
          profilePermissions: {
            old: page === 'criar' ? [] : oldProfilePermissions,
            new: data.profiles
          },
          schoolsPermissions: {
            old: page === 'criar' ? [] : oldSchoolPermissions,
            new: data.schools
          }
        }

        const formattedData = formatFormData(
          data,
          permissions,
          solution as Solution
        )
        return page === 'criar'
          ? dispatch(accessControlPostRequest(formattedData))
          : dispatch(accessControlPutRequest(formattedData))
      } catch (err) {
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
    [solution, oldProfilePermissions, oldSchoolPermissions, dispatch, page]
  )

  const openModal = useCallback(() => {
    modalRef.current?.onOpen()
  }, [])

  return (
    <>
      <BarLoader height="0.25rem" loading={loading} />
      <Box p={['4', '6']} mt={['0', '4']} w="100%">
        <Box ml={['0', '12vw']}>
          <Breadcrumbs
            data={[
              { title: 'Controle de Acessos', href: '/#/controle-de-acessos' },
              {
                title: page === 'criar' ? 'Criar Solução' : 'Editar Solução'
              }
            ]}
          />
        </Box>
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
              <Dropzone
                name="arquivo"
                label="Ícone"
                preview={{
                  url: solution?.arquivo || '',
                  fileName: solution?.slug || ''
                }}
              />
            </Box>

            <Stack
              direction={['column', 'row']}
              justifyContent="space-between"
              wrap="wrap"
              mt="5"
            >
              {selects(selectsOptions, formRef, schoolListRef).map(select => {
                if (select.name === 'schools') {
                  return (
                    <Box key={select.name} w={select.w} ml="0px !important">
                      <Select mb="4" variant="secondary" {...select} />
                      <SchoolList
                        ref={schoolListRef}
                        onDelete={(options: Option[]) => {
                          formRef.current?.setFieldValue('schools', options)
                        }}
                      />
                    </Box>
                  )
                }

                return (
                  <Box key={select.name} w={select.w} ml="0px !important">
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
              {page === 'editar' && (
                <Button
                  type="button"
                  onClick={openModal}
                  height="14"
                  width={['48.4%', '28']}
                  variant="outline"
                  fontWeight="500"
                  textTransform="uppercase"
                  colorScheme="red.500"
                  color="red.500"
                  marginTop=""
                  marginRight={['0', 'auto']}
                >
                  Excluir
                </Button>
              )}
            </Box>
          </Form>
        </Box>
        <ModalDeleteSolution ref={modalRef} solutionId={solution?.id} />
      </Box>
    </>
  )
}

export default SubmitSolution
