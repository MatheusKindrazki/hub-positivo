import { useEffect } from 'react'

import { useHistory, useLocation, useParams } from 'react-router-dom'
import amplitude from 'amplitude-js'

import { hasJsonStructure } from '~/utils/hasJsonStructure'

interface MessageProps {
  event: 'history-change' | undefined
  data: string
}

interface ParamsProps {
  solution: string
}
interface PageViewed {
  page_path: string
  page_title: string
  page_url: string
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

        if (parseData?.event === 'history-change') {
          let alterURL = parseData.data

          regexAccept.forEach(e => {
            alterURL = alterURL.replace(e, '/')
          })

          const newURL = new URL(alterURL)

          const pathname = location.pathname.split(params.solution)[0]

          const mergeLocation = pathname + params.solution

          const mountURL = mergeLocation + newURL.pathname

          if (mountURL === location.pathname) return

          const eventProperties: PageViewed = {
            page_path: mountURL,
            page_title: document.title,
            page_url: document.URL
          }

          amplitude.getInstance().logEvent('Page Viewed', eventProperties)

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
