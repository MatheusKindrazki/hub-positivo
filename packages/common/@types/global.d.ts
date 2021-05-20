declare global {
  type MakeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
}

export default global
