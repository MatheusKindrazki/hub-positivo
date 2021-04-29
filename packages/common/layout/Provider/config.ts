import { generate } from 'randomstring'

import getRandom from '../../utils/randomNumber'

export const generateKey = generate(getRandom(10, 15))
  .replace(/[0-9]/g, '')
  .toLowerCase()

export const cssKey = `hub-${generateKey}`
