import { NamedProps as N, Props as P } from 'react-select'

declare module 'react-select' {
  export interface NamedProps extends N {
    isMulti?: boolean
  }

  export interface Props extends P {
    isMulti?: boolean
  }
}
