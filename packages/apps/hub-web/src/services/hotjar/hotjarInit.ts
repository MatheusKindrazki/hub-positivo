import { hotjar } from 'react-hotjar'

const hjid = process.env.REACT_APP_HOTJAR_ID as any
const hjsv = 6

const hotjarInit = (): void => {
  hotjar.initialize(hjid, hjsv)
}

export default hotjarInit
