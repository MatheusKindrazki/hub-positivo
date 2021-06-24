import React, { useRef, useMemo } from 'react'

import classNames from 'classnames'

import {
  useMergeRefs,
  useDisclosure,
  useOnClickOutside,
  forwardRef
} from '@psdhub/common/hooks'
import { Box } from '@psdhub/common/components'

import { Fade } from '@chakra-ui/react'

import variants from './variants'
import { NewSelectProps } from './types'
import { Container } from './styles'
import { Control, Icon, InputSelect, NotFound } from './components'

const NewSelect = forwardRef<NewSelectProps, 'input'>((props, ref) => {
  const { className, defaultIsOpen, options, variant, controlStyle } = props

  const selectRef = useRef<HTMLDivElement>(null)

  const refs = useMergeRefs(selectRef, ref)

  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: true })

  const optionsRender = useMemo(() => {
    return options
  }, [options])

  const RenderOptions = variants[variant]

  useOnClickOutside(selectRef, onClose)
  return (
    <Container
      ref={refs}
      className={classNames(className, { 'hub-select': true })}
    >
      <Box
        className="hub-select-container"
        role="button"
        w="inherit"
        onKeyPress={onToggle}
        onClick={onToggle}
      >
        <Box className="hub-header-control">
          <InputSelect
            variant={variant}
            icon={<Icon open={isOpen} />}
            placeholder={props.placeholder}
            readOnly
            {...controlStyle}
          />
        </Box>
        {isOpen && (
          <Fade in={isOpen}>
            <Control className="hub-header-content">
              {optionsRender?.length ? (
                <RenderOptions {...props} />
              ) : (
                <NotFound text={props.notFoundText} />
              )}
            </Control>
          </Fade>
        )}
      </Box>
    </Container>
  )
})

export type { NewSelectProps }

export default NewSelect
