import { SelectProps } from '../types'
import { SelectContextProps } from '../context'

export default (props: SelectProps, context: SelectContextProps): void => {
  context.options = props.options
  context.isMulti = props.isMulti
  context.isBadge = props.isBadge
  context.clearable = props.clearable
  context.isSearchable = props.isSearchable
  context.noOptionsMessage = props.noOptionsMessage
}
