import { useEffect } from 'react'

import { useHistory, useLocation, useParams } from 'react-router-dom'

import hasJsonStructure from '~/utils/hasJsonStructure'

interface MessageProps {
  event: 'history-change' | undefined
  data: string
}

interface ParamsProps {
  solution: string
}

const regexAccept = ['/#!/', '/#/']

const usePostMessage = (): void => {
  const history = useHistory()
  const location = useLocation()

  const params = useParams<ParamsProps>()

  useEffect(() => {
    function handleEvent(event: { data: string }): void {
      if (typeof event.data === 'string') {
        if (!hasJsonStructure(event.data)) return

        const parseData = (JSON.parse(event.data) as MessageProps) || undefined

        if (parseData.event === 'history-change') {
          let alterURL = parseData.data

          regexAccept.forEach(e => {
            alterURL = alterURL.replace(e, '/')
          })

          const newURL = new URL(alterURL)

          const pathname = location.pathname.split(params.solution)[0]

          const mergeLocation = pathname + params.solution

          const mountURL = mergeLocation + newURL.pathname
          history.push(mountURL)
        }
      }
    }

    window.addEventListener('message', handleEvent)

    return () => {
      window.removeEventListener('message', handleEvent)
    }
  }, [history, location.pathname, params.solution])
}

export default usePostMessage
