import CryptoJS from 'crypto-js'

import { UserInfoProps } from '../services/getUserInfo'

const key = 'keyhubcripto'

const keySTORAGE = '@positivo:hub:auth:inject'

const getStorage = (): UserInfoProps | undefined => {
  const storage = localStorage.getItem(keySTORAGE) || ''

  if (!storage) {
    return undefined
  }

  const decrypt = CryptoJS.AES.decrypt(JSON.parse(storage), key).toString(
    CryptoJS.enc.Utf8
  )

  return JSON.parse(decrypt) as UserInfoProps
}

function setStorage<T>(data: T): void {
  const encryptData = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()

  localStorage.setItem(keySTORAGE, JSON.stringify(encryptData))
}

function removeStorage(): void {
  localStorage.removeItem(keySTORAGE)
}

export { getStorage, setStorage, removeStorage }
