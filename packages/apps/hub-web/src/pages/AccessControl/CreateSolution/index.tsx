import React, { useCallback, useEffect, useRef, useState } from 'react'

import { DropzoneRef } from 'react-dropzone'

import { useSelector } from 'react-redux'

import { CaretRight } from '@psdhub/common/components/Icons'
import { FormProps, Form, Input, Button } from '@psdhub/common/components/Form'
import Dropzone from '@psdhub/common/components/Dropzone'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@psdhub/common/components/Breadcrumbs'
import { Box, Text, Select, Stack } from '@psdhub/common/components'

import history from '~/services/history'

const CreateSolution: React.FC = () => {
  const [operation, setOperation] = useState('')
  const { loading: alterLoading } = useSelector(
    (state: Store.State) => state.user
  )

  useEffect(() => {
    if (history.location.pathname.endsWith('criar-solucao')) {
      setOperation('create')
    }
    if (history.location.pathname.endsWith('editar-solucao')) {
      setOperation('update')
    }
    console.log('operacao selecionada: ' + operation)
  }, [operation])

  const formRef = useRef<FormProps>(null)
  const dropRef = useRef<DropzoneRef>(null)

  const handleSubmit = useCallback(async data => {
    console.log(data)
  }, [])

  return (
    <Box p="6" mt="20" w="100%">
      <Box d="flex" flexDir="row" ml="12vw">
        <Breadcrumb fontSize="x-large" separator={<Box as={CaretRight} />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/#/controle-de-acessos">
              Controle de Acessos
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink>Adicionar Solucao</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box w="45%" m="auto" mt="12">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Box d="flex" flexDir="column" mb="6">
            <Input
              label="Titulo"
              name="teste"
              backgroundColor="white"
              placeholder="Digite aqui o título da solução"
            />

            <Input
              label="Descricao"
              name="teste"
              backgroundColor="white"
              placeholder="Digite uma breve descrição para ajudar os usuários a entenderem a função desta solução"
            />
          </Box>

          <Box>
            <Text color="blue.500">Ícone</Text>
            <Dropzone ref={dropRef} />
          </Box>

          <Stack direction={'row'} justifyContent="space-between" mt="5">
            <Box width="48.5%">
              <Text color="blue.500">Categoria</Text>
              <Select
                variant="secondary"
                name="categoria"
                id="categoria"
                height="30px"
              ></Select>
            </Box>
            <Box width="48.5%">
              <Text color="blue.500">Perfis</Text>
              <Select variant="secondary" name="teste" m="auto"></Select>
            </Box>
          </Stack>

          <Stack direction={'row'} justifyContent="space-between" mt="5">
            <Box width="48.5%">
              <Text color="blue.500">Segmentos</Text>
              <Select variant="secondary" name="teste" m="auto"></Select>
            </Box>
            <Box width="48.5%">
              <Text color="blue.500">Abrir em...</Text>
              <Select
                variant="secondary"
                name="teste"
                m="auto"
                className="hub-select"
              ></Select>
            </Box>
          </Stack>

          <Stack direction={'row'} justifyContent="space-between" mt="5">
            <Box width="48.5%">
              <Text color="blue.500">Escolas</Text>
              <Select variant="secondary" name="teste" m="auto"></Select>
            </Box>
            <Box width="48.5%" alignSelf="flex-end">
              <Select variant="secondary" name="teste" m="auto"></Select>
            </Box>
          </Stack>

          <Box flexDir="row-reverse" d="flex">
            <Button
              marginLeft="3"
              height="14"
              maxWidth="32"
              fontWeight="500"
              textTransform="uppercase"
              colorScheme="blue"
              isLoading={alterLoading}
            >
              Adicionar
            </Button>
            <Button
              height="14"
              maxWidth="32"
              variant="outline"
              fontWeight="500"
              textTransform="uppercase"
              color="gray"
            >
              Cancelar
            </Button>
          </Box>
        </Form>
      </Box>
    </Box>
  )
}

export default CreateSolution
