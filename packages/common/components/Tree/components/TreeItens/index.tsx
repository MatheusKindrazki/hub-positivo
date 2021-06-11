import React from 'react'

import Stack from '../../../Stack'
import Checkbox, { CheckboxProps } from '../../../Checkbox'

type OnChangeProps = React.ChangeEvent<HTMLInputElement>

interface TreeItensProps extends Omit<CheckboxProps, 'onChange'> {
  className?: string
  value: string
  label: string
  onChange: (e: OnChangeProps, children: any) => void
}

const TreeItens: React.FC<TreeItensProps> = ({
  children,
  label,
  onChange,
  value,
  ...rest
}) => {
  return (
    <>
      <Checkbox
        value={value}
        onChange={e => {
          onChange && onChange(e, children)
        }}
        {...rest}
      >
        {label}
      </Checkbox>
      {children && (
        <Stack pl={6} mt={1} spacing={1}>
          {children}
        </Stack>
      )}
    </>
  )
}

export default TreeItens
