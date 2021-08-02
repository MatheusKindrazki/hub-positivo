import React, {
  createContext,
  useCallback,
  useRef,
  useReducer,
  useContext
} from 'react'

import { SelectContextProps, SelectProviderProps, TreeNode } from './types'
import { StateRef } from '../types'

const INITIAL_STATE: SelectContextProps = {
  isMulti: false,
  clearable: false,
  isBadge: false,
  isSearchable: false,
  options: [],
  setState: () => {},
  onChange: () => {},
  getState: () => ({
    checked: [],
    raw: []
  }),
  onClose: () => {},
  refresh: () => {},
  onChange: () => {},
  onClose: () => {},
  searchable: _ => {}
}

const SelectContext = createContext(INITIAL_STATE)

const SelectProvider: React.FC<SelectProviderProps> = ({
  children,
  ...props
}) => {
  const storeValuables = useRef({
    raw: [] as TreeNode[],
    checked: [] as string[]
  })

  const [, forceUpdate] = useReducer(x => x + 1, 0)

  const context = useSelect()

  const getState = useCallback(() => {
    return storeValuables.current
  }, [])

  const setState = useCallback((data: StateRef) => {
    storeValuables.current = data
  }, [])

  const onChange = useCallback(
    (checked: string[], raw: TreeNode[]) => {
      setState({ checked, raw })

      props.onChange && props.onChange(checked, raw)

      if (props.closeOnSelect) {
        props.onClose()
      }
    },
    [props, setState]
  )

  return (
    <SelectContext.Provider
      value={{
        ...context,
        onChange,
        refresh: forceUpdate,
        getState,
        setState,
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
