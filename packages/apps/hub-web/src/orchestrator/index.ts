import api from '@psdhub/api'

import { DataScripts, ReturnScripts } from './types'

const acceptExtensions = ['css', 'js']

const loadScripts = async (data: DataScripts): Promise<ReturnScripts> => {
  const res = await api.get(data.manifest)

  if (!res.ok) {
    throw new Error('Não foi possível carregar os arquivos!')
  }

  const { files: resFiles, element_id } = res.data as {
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
