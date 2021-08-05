import { SelectProps } from '../types'
import { SelectContextProps } from '../context/types'

export default (props: SelectProps, context: SelectContextProps): void => {
  context.options = props.options
  context.isMulti = props.isMulti
  context.isBadge = props.isBadge
  context.clearable = props.clearable
  context.labelLength = props.labelLength
  context.isSearchable = props.isSearchable
  context.allSelectMessage = props.allSelectMessage
  context.noOptionsMessage = props.noOptionsMessage
  context.placeholderPersist = props.placeholderPersist
}
