import Secondary from './variants/Secondary'
import Primary from './variants/Primary'
import Normal from './variants/Normal'

export default {
  normal: Normal,
  primary: Primary,
  secondary: Secondary
}

export const prefixClass = process.env.REACT_APP_IS_HUB
  ? 'hub'
  : 'hub-component'
