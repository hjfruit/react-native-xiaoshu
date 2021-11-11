import type React from 'react'
import type {
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'

interface CheckboxIconPrivateProps {
  /**
   * 是否选中、高亮
   */
  active?: boolean

  /**
   * 选中状态颜色
   * @default 主题色
   */
  activeColor?: string

  /**
   * 图标大小，默认单位为 px
   * @default 20
   */
  size?: number

  /**
   * 形状，可选值为 `'square' | 'round'`
   * @default 'round'
   */
  shape?: 'square' | 'round'

  /**
   * 纯粹的 icon 没有任何点击属性
   * @default false
   */
  pure?: boolean

  /**
   * 自定义图标
   */
  icon?: React.ReactNode
}

export interface CheckboxIconProps
  extends TouchableOpacityProps,
    CheckboxIconPrivateProps {}

export interface CheckboxProps<ActiveValueT = any, InactiveValueT = any>
  extends Omit<CheckboxIconPrivateProps, 'active' | 'size' | 'pure'> {
  style?: StyleProp<ViewStyle>

  /**
   * 文案样式
   */
  labelTextStyle?: StyleProp<TextStyle>

  /**
   * 图标样式
   */
  iconStyle?: StyleProp<ViewStyle>

  /**
   * 默认值
   */
  defaultValue?: ActiveValueT | InactiveValueT

  /**
   * 当前是否选择
   */
  value?: ActiveValueT | InactiveValueT

  /**
   * 状态变化
   */
  onChange?: (value: ActiveValueT | InactiveValueT) => void

  /**
   * 选中时对应的值
   * @default true
   */
  activeValue?: ActiveValueT

  /**
   * 未选中时对应的值
   * @default false
   */
  inactiveValue?: InactiveValueT

  /**
   * 文案
   */
  label?: React.ReactNode

  /**
   * 是否禁用复选框文本点击
   */
  labelDisabled?: boolean

  /**
   * 文本位置，可选值为 `'left' | 'right'`
   */
  labelPosition?: 'left' | 'right'

  /**
   * 图标大小
   * @default 20
   */
  iconSize?: number

  /**
   * 是否禁用复选框
   */
  disabled?: boolean
}
