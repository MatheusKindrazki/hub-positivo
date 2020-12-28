import { useLocation } from 'react-router-dom'

interface UseQueryProps {
  (): {
    get: (e: string) => string | undefined
  }
}

const useQuery: UseQueryProps = (): any => {
  return (new URLSearchParams(useLocation().search) as unknown) as UseQueryProps
}

export default useQuery
