import api from '@hub/api'

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

  const files = {} as ReturnScripts

  Object.keys(resFiles).forEach(e => {
    const extension = e.split('.')

    if (acceptExtensions.includes(extension[extension.length - 1])) {
      files.scripts.push({
        type: extension[extension.length - 1],
        url: resFiles[e]
      })
    }
  })

  files.element_id = element_id

  return files
}

export { loadScripts }
