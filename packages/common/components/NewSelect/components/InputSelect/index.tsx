import React from 'react'

import {
  Input as ChakraInput,
  FormControl,
  InputGroup,
  useTheme,
  InputProps,
  forwardRef,
  InputRightElement
} from '@chakra-ui/react'

export interface InputAddIcons extends InputProps {
  icon: React.ReactNode
}
const InputSelect = forwardRef<InputProps, 'input'>(
  ({ icon, placeholder = 'Selecione', mb, ...rest }, ref) => {
    const { colors } = useTheme()

    return (
      <FormControl mb={mb} w="100%">
        <InputGroup d="flex" flexDir="column">
          <ChakraInput
            data-testid="form-input"
            ref={ref}
            rounded="md"
            cursor="pointer"
            height="3rem"
            backgroundColor="white"
            borderWidth="1px"
            borderColor="gray.400"
            placeholder={placeholder}
            _placeholder={{
              color: '#7A7A7A',
              fontSize: '14px'
            }}
            _hover={{
              borderColor: 'blue.500'
            }}
            _focus={{
              borderColor: 'blue.500',
              boxShadow: `0 0 0 1px ${colors.blue[500]}`
            }}
            errorBorderColor="red.300"
            {...rest}
          />
          <InputRightElement children={icon} width="3rem" height="3rem" />
        </InputGroup>
      </FormControl>
    )
  }
)

export default InputSelect
