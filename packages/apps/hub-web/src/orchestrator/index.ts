import { generate } from 'randomstring'
import qs from 'qs'

import { DataScripts, ReturnScripts } from './types'

const acceptExtensions = ['css', 'js']

const loadScripts = async (data: DataScripts): Promise<ReturnScripts> => {
  const randomUrl = qs.stringify({
    v: process.env.REACT_APP_VERSION,
    hash: generate(10)
  })

  const res = await fetch(`${data.manifestUrl}?${randomUrl}`)

  if (!res.ok) {
    throw new Error('Erro ao carregar solução')
  }

  const responseData = await res.json()

  const { files: resFiles, element_id } = responseData as {
    files: any
    element_id: string
  }

  const scripts: ReturnScripts['scripts'] = []

  Object.keys(resFiles).map(e => {
    const extension = e.split('.')

    if (acceptExtensions.includes(extension[extension.length - 1])) {
      scripts.push({
        type: extension[extension.length - 1],
        url: resFiles[e]
      })
    }
  })

  const files: ReturnScripts = {
    element_id,
    scripts
  }

  return files
}

export { loadScripts }
export type { DataScripts, ReturnScripts }
