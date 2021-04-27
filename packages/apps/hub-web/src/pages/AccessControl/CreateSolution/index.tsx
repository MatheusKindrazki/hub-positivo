import React, { useCallback, useRef } from 'react'

import { DropzoneRef } from 'react-dropzone'
import classNames from 'classnames'

import { useSelector } from 'react-redux'

import { useTheme } from '@psdhub/common/layout'
import { FormProps, Form, Input, Button } from '@psdhub/common/components/Form'
import Dropzone from '@psdhub/common/components/Dropzone'
import BarLoader from '@psdhub/common/components/BarLoader'
import { Box, Text, Select, Stack } from '@psdhub/common/components'

const CreateSolution: React.FC = () => {
  const { colors } = useTheme()

  const { loading } = useSelector((state: Store.State) => state.forgotPassword)
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
      <Box
        d="flex"
        flexDir="row"
        w="28.5rem"
        justifyContent="space-between"
        ml="14rem"
        mb="2rem"
      >
        <Text fontSize="x-large">Controle de acessos</Text>
        <Text fontSize="large" fontWeight="300" alignSelf="center">
          {'>'}
        </Text>
        <Text fontSize="x-large">Adicionar Solução</Text>
      </Box>

      <Box w="48rem" m="auto">
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          className={classNames({
            disabled: loading
          })}
        >
          <Box d="flex" flexDir="column">
            <Box mb="1.6rem">
              <Text color={`${colors.blue[500]}`}>Titulo</Text>
              <Input
                name="teste"
                backgroundColor="white"
                placeholder="Digite aqui o título da solução"
              />
            </Box>
            <Box mb="1.6rem">
              <Text color={`${colors.blue[500]}`}>Descricao</Text>
              <Input
                name="teste"
                backgroundColor="white"
                placeholder="Digite uma breve descrição para ajudar os usuários a entenderem a função desta solução"
              />
            </Box>
          </Box>
          <Box>
            <Text color={`${colors.blue[500]}`}>Ícone</Text>
            <Dropzone ref={dropRef} />
          </Box>

          <Stack direction={'row'} justifyContent="space-between" mt="1.6rem">
            <Box width="48.5%">
              <Text color={`${colors.blue[500]}`}>Categoria</Text>
              <Select variant="normal" name="teste" m="auto"></Select>
            </Box>
            <Box width="48.5%">
              <Text color={`${colors.blue[500]}`}>Perfis</Text>
              <Select variant="normal" name="teste" m="auto"></Select>
            </Box>
          </Stack>

          <Stack direction={'row'} justifyContent="space-between" mt="1.6rem">
            <Box width="48.5%">
              <Text color={`${colors.blue[500]}`}>Segmentos</Text>
              <Select variant="normal" name="teste" m="auto"></Select>
            </Box>
            <Box width="48.5%">
              <Text color={`${colors.blue[500]}`}>Abrir em...</Text>
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
              <Text color={`${colors.blue[500]}`}>Escolas</Text>
              <Select
                variant="normal"
                name="teste"
                m="auto"
                bg="tomato"
                borderColor="tomato"
                color="white"
              ></Select>
            </Box>
            <Box width="48.5%" alignSelf="flex-end">
              <Select variant="normal" name="teste" m="auto"></Select>
            </Box>
          </Stack>

          <Box flexDir="row-reverse" d="flex">
            <Button isLoading={alterLoading} maxWidth="8rem">
              Adicionar
            </Button>
            <Button
              variant="outline"
              maxWidth="8rem"
              background={`${colors.gray[400]}`}
              textColor={`${colors.gray[500]}`}
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
