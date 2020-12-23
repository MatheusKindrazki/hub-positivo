import React from 'react'

import { toast, ToastContent, ToastOptions } from 'react-toastify'

export interface ToastProps {
  success(
    content: ToastContent,
    options?: ToastOptions | undefined
  ): React.ReactText
  info(
    content: ToastContent,
    options?: ToastOptions | undefined
  ): React.ReactText
  error(
    content: ToastContent,
    options?: ToastOptions | undefined
  ): React.ReactText
  warning(
    content: ToastContent,
    options?: ToastOptions | undefined
  ): React.ReactText
}

function useToast(): ToastProps {
  const { error, info, success, warning } = toast
  return {
    error,
    info,
    success,
    warning
  }
}
export { useToast }

export default toast
