import { Form as UnForm } from '@unform/web'
import { FormHandles } from '@unform/core'

import { chakra } from '@chakra-ui/react'

export { default as Input } from './Input'
export { default as Button } from './Button'
export { default as Select } from './Select'
export { default as Dropzone } from './Dropzone'
export { default as NewSelect } from './NewSelect'
export { default as Datepicker } from './Datepicker'

export const Form = chakra(UnForm)

export type { FormHandles as FormProps }
