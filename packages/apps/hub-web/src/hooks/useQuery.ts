import { useLocation } from 'react-router-dom'

interface UseQueryProps {
  (): {
    get: (e: string) => string | undefined
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useQuery: UseQueryProps = (): any => {
  return (new URLSearchParams(useLocation().search) as unknown) as UseQueryProps
}

export default useQuery
