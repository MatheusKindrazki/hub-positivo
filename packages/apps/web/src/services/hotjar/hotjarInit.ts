import { hotjar } from 'react-hotjar'
const hotjarInit = (): void => {
  const hjsv = 6
  const hjid = process.env.REACT_APP_HOTJAR_ID as any

  hotjar.initialize(hjid, hjsv)
}

export default hotjarInit
