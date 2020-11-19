import React, { useRef, useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Box, Heading, Text, Button } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Lock, User, Eye, EyeSlash } from 'phosphor-react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Input } from '~/components/Form';

import { signInRequest } from '~/store/modules/auth/actions';
import documentTitle from '~/utils/documentTitle';
import getValidationErrors from '~/utils/getValidationErrors';
import signInValidator from '~/validators/signIn';

const SignIn: React.FC = () => {
  documentTitle('Entrar');

  const dispatch = useDispatch();
  const [view, setView] = useState(false);

  const { loading } = useSelector((state: Store.State) => state.auth);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});

      try {
        await signInValidator.validate(data, {
          abortEarly: false,
        });

        dispatch(signInRequest(data));
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef?.current?.setErrors(errors);

          return;
        }

        toast.error('Algo deu errado, Verifique seus dados e tente novamente!');
      }
    },
    [dispatch],
  );

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

        <Button
          isLoading={loading}
          data-testid="submit-button"
          mt="2rem"
          type="submit"
          color="white"
          fontWeight="bold"
          boxShadow="none!important"
          variantColor="blue"
          width="100%"
          height="3rem"
        >
          Entrar
        </Button>

        {/* <Button
          as={Link}
          mt="1rem"
          mb="0.5rem"
          fontWeight="bold"
          boxShadow="none!important"
          variantColor="blue"
          variant="link"
          width="100%"
          height="3rem"
        >
          Esqueci minha senha
        </Button> */}
      </Form>
    </Box>
  );
};

export default SignIn;
