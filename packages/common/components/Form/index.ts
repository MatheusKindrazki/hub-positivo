import { Form as UnForm } from '@unform/web'
import { FormHandles } from '@unform/core'

import { chakra } from '@chakra-ui/react'

export { default as Input } from './Input'
export { default as Button } from './Button'

export const Form = chakra(UnForm)
export type { FormHandles as FormProps }
