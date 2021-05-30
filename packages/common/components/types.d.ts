import { WelcomeProps } from './Welcome'
import { StepsTour, TourProps } from './Tour'
import { TooltipProps } from './Tooltip'
import { TextProps } from './Text'
import { TableProps } from './Table'
import { SwitchProps } from './Switch'
import { SpinnerProps } from './SpinnerLoader'
import { SkeletonProps, SkeletonTextProps } from './Skeleton'
import { SimpleGridProps } from './SimpleGrid'
import { PropsSelect } from './Select'
import { SearchProps } from './Search'
import { ModalProps } from './Modal'
import { InputProps } from './Input'
import { ImageProps } from './Image'
import { HeadingProps } from './Heading'
import { FormLabelProps } from './FormLabel'
import { FormControlProps } from './FormControl'
import { FlexProps } from './Flex'
import { CollapseProps } from './Collapse'
import { CardProps } from './CardBox'
import { ButtonProps } from './Button'
import { BoxProps } from './Box'
import { BadgeProps } from './Badge'
import { AvatarProps } from './Avatar'

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
    export { SkeletonProps, SkeletonTextProps }
    export { FormLabelProps as LabelProps }
    export { SwitchProps }
    export { TableProps }
    export { FormControlProps }
  }
}
