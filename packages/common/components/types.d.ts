import { AvatarProps } from './Avatar'
import { BadgeProps } from './Badge'
import { BoxProps } from './Box'
import { ButtonProps } from './Button'
import { CardProps } from './CardBox'
import { CollapseProps } from './Collapse'
import { FlexProps } from './Flex'
import { HeadingProps } from './Heading'
import { ImageProps } from './Image'
import { InputProps } from './Input'
import { ModalProps } from './Modal'
import { SearchProps } from './Search'
import { PropsSelect } from './Select'
import { SimpleGridProps } from './SimpleGrid'
import { SpinnerProps } from './SpinnerLoader'
import { TextProps } from './Text'
import { TooltipProps } from './Tooltip'
import { StepsTour, TourProps } from './Tour'
import { WelcomeProps } from './Welcome'

declare global {
  declare namespace Hub {
    export { AvatarProps }
    export { BadgeProps }
    export { BoxProps }
    export { ButtonProps }
    export { CardProps }
    export { CollapseProps }
    export { FlexProps }
    export { HeadingProps }
    export { ImageProps }
    export { InputProps }
    export { SearchProps }
    export { PropsSelect }
    export { SimpleGridProps }
    export { SpinnerProps }
    export { TextProps }
    export { TooltipProps }
    export { StepsTour, TourProps }
    export { WelcomeProps }
    export { ModalProps }
  }
}
