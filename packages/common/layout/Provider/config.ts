import { generate } from 'randomstring'

import getRandom from '../../utils/randomNumber'

const generateKey = generate(getRandom(10, 15)).replace(/[0-9]/g, '')

export const cssKey = !process.env.REACT_APP_IS_HUB
  ? 'hub-component'
  : `hub-${generateKey.toLowerCase()}`
