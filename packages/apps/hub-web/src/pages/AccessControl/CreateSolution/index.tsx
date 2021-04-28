import React, { useCallback, useRef } from 'react'

import { DropzoneRef } from 'react-dropzone'

import { useSelector } from 'react-redux'

import { FormProps, Form, Input, Button } from '@psdhub/common/components/Form'
import Dropzone from '@psdhub/common/components/Dropzone'
import { Breadcrumb } from '@psdhub/common/components/BreadCrumbs'
import { Box, Text, Select, Stack } from '@psdhub/common/components'

const CreateSolution: React.FC = () => {
  const { loading: alterLoading } = useSelector(
    (state: Store.State) => state.user
  )

  const formRef = useRef<FormProps>(null)
  const dropRef = useRef<DropzoneRef>(null)

  const handleSubmit = useCallback(async data => {
    console.log(data)
  }, [])

  return (
    <Box p="6" mt="5rem">
      <Box
        d="flex"
        flexDir="row"
        w="28.5rem"
        justifyContent="space-between"
        ml="14rem"
        mb="2rem"
      >
        <Breadcrumb
          items={[
            { title: 'Controle de Acessos', href: 'controle-de-acessos' },
            { title: 'Adicionar Solucao' }
          ]}
        />
      </Box>

      <Box w="48rem" m="auto">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Box d="flex" flexDir="column">
            <Box mb="1.6rem">
              <Text color="blue.500">Titulo</Text>
              <Input
                name="teste"
                backgroundColor="white"
                placeholder="Digite aqui o título da solução"
              />
            </Box>
            <Box mb="1.6rem">
              <Text color="blue.500">Descricao</Text>
              <Input
                name="teste"
                backgroundColor="white"
                placeholder="Digite uma breve descrição para ajudar os usuários a entenderem a função desta solução"
              />
            </Box>
          </Box>
          <Box>
            <Text color="blue.500">Ícone</Text>
            <Dropzone ref={dropRef} />
          </Box>

          <Stack direction={'row'} justifyContent="space-between" mt="1.6rem">
            <Box width="48.5%">
              <Text color="blue.500">Categoria</Text>
              <Select variant="normal" name="teste" height="30px"></Select>
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
              <Select
                variant="normal"
                name="teste"
                m="auto"
                className="hub-select"
              ></Select>
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
              isLoading={alterLoading}
              maxWidth="8rem"
              textTransform="uppercase"
              fontWeight="500"
              minHeight="3.4rem"
            >
              Adicionar
            </Button>
            <Button
              variant="outline"
              maxWidth="8rem"
              minHeight="3.4rem"
              background="gray.400"
              textColor="gray.500"
              fontWeight="500"
              textTransform="uppercase"
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
