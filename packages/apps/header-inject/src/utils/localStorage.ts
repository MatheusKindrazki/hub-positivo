import CryptoJS from 'crypto-js'

import { UserInfoProps } from '../services/getUserInfo'

const key = process.env.HUB_ENCRYPT_INJECT_STORAGE || ''

const getStorage = (): UserInfoProps | undefined => {
  const storage = localStorage.getItem('@positivo:hub:auth:inject') || ''

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

  localStorage.setItem('@positivo:hub:auth:inject', JSON.stringify(encryptData))
}

export { getStorage, setStorage }
