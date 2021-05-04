import React, { useCallback, useRef } from 'react'

import { DropzoneRef } from 'react-dropzone'

import { useSelector } from 'react-redux'

import { CaretRight } from '@psdhub/common/components/Icons'
import {
  FormProps,
  Form,
  Input,
  Button as FormButton,
  Select
} from '@psdhub/common/components/Form'
import Dropzone from '@psdhub/common/components/Dropzone'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@psdhub/common/components/Breadcrumbs'
import { Box, Text, Stack, Button } from '@psdhub/common/components'

import { ModalDeleteSolution, ModalHandler } from './ModalDelete'

const UpdateSolution: React.FC = () => {
  const { loading: alterLoading } = useSelector(
    (state: Store.State) => state.user
  )

  const formRef = useRef<FormProps>(null)
  const dropRef = useRef<DropzoneRef>(null)
  const modalRef = useRef<ModalHandler>(null)

  const handleSubmit = useCallback(async data => {
    console.log(data)
  }, [])

  const openModal = useCallback(() => {
    modalRef.current?.onOpen()
  }, [])

  return (
    <Box p={['4', '6']} mt={['0', '20']} w="100%">
      <Box d="flex" flexDir="row" ml={['0', '12vw']}>
        <Breadcrumb
          fontSize={['large', 'x-large']}
          spacing={['0.5', '1']}
          separator={<Box as={CaretRight} />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/#/controle-de-acessos">
              Controle de Acessos
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink>Editar Solucao</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box w={['100%', '45%']} m="auto" mt="12">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Box d="flex" flexDir="column" mb="6">
            <Input
              mb="5"
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

          <Stack
            direction={['column', 'row']}
            justifyContent="space-between"
            mt="5"
          >
            <Box width={['100%', '48.5%']}>
              <Text color="blue.500">Categoria</Text>
              <Select
                variant="secondary"
                name="categoria"
                id="categoria"
              ></Select>
            </Box>
            <Box width={['100%', '48.5%']}>
              <Text color="blue.500">Perfis</Text>
              <Select variant="secondary" name="teste" m="auto"></Select>
            </Box>
          </Stack>

          <Stack
            direction={['column', 'row']}
            justifyContent="space-between"
            mt="5"
          >
            <Box width={['100%', '48.5%']}>
              <Text color="blue.500">Segmentos</Text>
              <Select variant="secondary" name="teste" m="auto"></Select>
            </Box>
            <Box width={['100%', '48.5%']}>
              <Text color="blue.500">Abrir em...</Text>
              <Select
                variant="secondary"
                name="teste"
                m="auto"
                className="hub-select"
              ></Select>
            </Box>
          </Stack>

          <Stack
            direction={['column', 'row']}
            justifyContent="space-between"
            mt="5"
          >
            <Box width={['100%', '48.5%']}>
              <Text color="blue.500">Escolas</Text>
              <Select variant="secondary" name="teste" m="auto"></Select>
            </Box>
            <Box width={['100%', '48.5%']} alignSelf="flex-end">
              <Select variant="secondary" name="teste" m="auto"></Select>
            </Box>
          </Stack>

          <Box
            mt="9"
            flexDir={['row', 'row-reverse']}
            flexWrap={['wrap', 'nowrap']}
            d="flex"
            w="100%"
            justifyContent="space-between"
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
              alignSelf="flex-start"
            >
              Cancelar
            </Button>

            <Button
              onClick={openModal}
              height="14"
              width={['48.4%', '32']}
              variant="outline"
              fontWeight="500"
              textTransform="uppercase"
              colorScheme="red"
              color="red"
            >
              Excluir
            </Button>
          </Box>
        </Form>
      </Box>
      <ModalDeleteSolution ref={modalRef} />
    </Box>
  )
}

export default UpdateSolution
