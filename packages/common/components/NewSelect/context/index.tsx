import React, {
  createContext,
  useCallback,
  useState,
  useReducer,
  useContext
} from 'react'

import { SelectContextProps, SelectProviderProps, TreeNode } from './types'

const INITIAL_STATE: SelectContextProps = {
  isMulti: false,
  clearable: false,
  isBadge: false,
  isSearchable: false,
  state: {
    checked: [] as string[],
    raw: [] as TreeNode[]
  },
  options: [],
  onChange: () => {},
  onClose: () => {},
  refresh: () => {},
  searchable: _ => {}
}

const SelectContext = createContext(INITIAL_STATE)

const SelectProvider: React.FC<SelectProviderProps> = ({
  children,
  ...props
}) => {
  const context = useSelect()

  const [, forceUpdate] = useReducer(x => x + 1, 0)

  const [storeValuables, setStoreValuables] = useState({
    raw: [] as TreeNode[],
    checked: [] as string[]
  })

  const onChange = useCallback(
    (checked: string[], raw: TreeNode[]) => {
      setStoreValuables({ checked, raw })

      props.onChange && props.onChange(checked, raw)

      if (props.closeOnSelect) {
        props.onClose()
      }
    },
    [props]
  )

  return (
    <SelectContext.Provider
      value={{
        ...context,
        onChange,
        state: storeValuables,
        refresh: forceUpdate,
        onClose: props.onClose
      }}
    >
      {children}
    </SelectContext.Provider>
  )
}

function useSelect(): SelectContextProps {
  const context = useContext(SelectContext)

  if (!context) {
    throw new Error('SelectContext not found')
  }

  return context
}

export { useSelect }

export default SelectProvider
