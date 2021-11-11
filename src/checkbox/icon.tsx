import React, { memo, isValidElement } from 'react'
import type { ViewStyle } from 'react-native'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { useTheme, widthStyle } from '../theme'
import { IconSuccessOutLine } from '../icon'
import { getDefaultValue } from '../helpers'
import { isDef } from '../helpers/typeof'
import { createStyles } from './style.icon'
import type { CheckboxIconProps } from './interface'

const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  active,
  activeColor,
  size,
  shape = 'round',
  disabled,
  pure = false,
  icon,

  style,
  activeOpacity,
  ...restProps
}) => {
  const themeVar = useTheme()

  // 从配置中拿默认值
  size = getDefaultValue(size, themeVar.checkbox_icon_size)
  activeColor = getDefaultValue(
    activeColor,
    themeVar.checkbox_checked_icon_color,
  )
  activeOpacity = getDefaultValue(activeOpacity, themeVar.active_opacity)

  const STYLES = widthStyle(themeVar, createStyles)

  const styleSummary = StyleSheet.flatten<ViewStyle>([
    STYLES.icon,
    {
      width: size,
      height: size,
      borderRadius: shape === 'round' ? size / 2 : themeVar.border_radius_sm,
    },
    active
      ? {
          backgroundColor: activeColor,
          borderColor: activeColor,
        }
      : null,
    disabled ? STYLES.icon_disabled : null,
    style,
  ])

  const iconJSX = active ? (
    isDef(icon) && isValidElement(icon) ? (
      icon
    ) : (
      <IconSuccessOutLine
        size={size}
        color={disabled ? themeVar.checkbox_icon_border_color : '#fff'}
      />
    )
  ) : null

  if (pure) {
    return <View style={styleSummary}>{iconJSX}</View>
  }

  return (
    <TouchableOpacity
      {...restProps}
      style={styleSummary}
      disabled={disabled}
      activeOpacity={activeOpacity}>
      {iconJSX}
    </TouchableOpacity>
  )
}

export default memo(CheckboxIcon)
