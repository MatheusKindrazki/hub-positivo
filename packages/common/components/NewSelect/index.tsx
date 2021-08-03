import React, { useRef, memo, forwardRef, useLayoutEffect } from 'react'

import CustomScroll from 'react-custom-scroll'
import classNames from 'classnames'

import { useDisclosure, useOnClickOutside } from '@psdhub/common/hooks'
import { Box } from '@psdhub/common/components'

import syncPropsContext from './utils/syncPropsContext'
import markCheckedItens from './utils/markCheckedItens'
import { SelectProps, SelectRefProps } from './types'
import { Container } from './styles'
import useConnectRefToContext from './hooks/useConnectRefToContext'
import SelectProvider, { useSelect } from './context'
import options from './components/Variants/options'
import { Icon, Control, ContainerOptions, ClearAll } from './components'

const Select = forwardRef<SelectRefProps, SelectProps>((props, ref) => {
  const defaultValue = useRef(props.defaultValue)
  const containerRef = useRef<HTMLDivElement>(null)

  const context = useSelect()

  const { defaultIsOpen, placeholder } = props
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen })

  const Variant = options[props.variant || 'normal']
  useLayoutEffect(() => {
    markCheckedItens(defaultValue.current || [], context)
  }, [context])

  syncPropsContext(props, context)
  useOnClickOutside(containerRef, onClose, 'click')
  useConnectRefToContext(context, ref)
  return (
    <SelectProvider
      onClose={onClose}
      closeOnSelect={props.closeOnSelect}
      onChange={props.onChange}
    >
      <Container
        ref={containerRef}
        className={classNames({
          'hub-select-wrapper': true,
          active: isOpen
        })}
        error={props.error}
      >
        <Box className="hub-select-header">
          <Box
            role="button"
            className="hub-select-header-title"
            onClick={onToggle}
            maxW={props.clearable ? 'calc(100% - 1.5rem)' : '100%'}
          >
            <Control
              hideSelected={props.hideSelected}
              placeholder={placeholder}
              focus={isOpen}
            />
          </Box>
          {props.clearable && <ClearAll />}
          <Icon onClick={onToggle} open={isOpen} />
        </Box>
        {isOpen && (
          <ContainerOptions
            className={classNames({
              'hub-select-list': true,
              searchable: true
            })}
          >
            <CustomScroll allowOuterScroll flex="1">
              <div className="hub-content">
                <Variant />
              </div>
            </CustomScroll>
          </ContainerOptions>
        )}
      </Container>
    </SelectProvider>
  )
})

export type { SelectRefProps, SelectProps }

export default memo(Select)
