import Color from 'color'
import isNil from 'lodash/isNil'
import React, { memo, useMemo } from 'react'
import type { ViewStyle, TextStyle, StyleProp } from 'react-native'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import { getDefaultValue } from '../helpers'
import { useDebounceFn } from '../hooks'
import InitialValue from '../initial-value'
import Loading from '../loading'
import Theme from '../theme'

import type { ButtonProps } from './interface'
import { varCreator, styleCreator } from './style'

/**
 * Button 按钮
 * @description 按钮用于触发一个操作，如提交表单。
 */
const Button: React.FC<ButtonProps> = props => {
  let {
    children,
    style,
    text,
    textStyle,
    type = 'primary',
    danger = false,
    size = 'l',
    hairline = false,
    disabled = false,
    loading = false,
    loadingText,
    square = false,
    round = false,
    renderLeftIcon,
    color,
    textColor,
    onPressDebounceWait = 0,

    ...restProps
  } = InitialValue.useInitialProps('Button', props)
  const TOKENS = Theme.useThemeTokens()
  const CV = Theme.createVar(TOKENS, varCreator)
  const STYLES = Theme.createStyle(CV, styleCreator)
  const { run: runOnPress } = useDebounceFn(restProps.onPress, {
    wait: onPressDebounceWait,
  })

  color = getDefaultValue(
    color,
    danger ? CV.button_danger_color : CV.button_primary_color,
  )
  textColor = getDefaultValue(textColor, TOKENS.white)

  const [_backgroundColor, _borderColor, _textColor, _borderWidth] =
    useMemo(() => {
      switch (type) {
        case 'hazy': {
          const hazyColor = Color(color)
            .lightness(CV.button_hazy_lightness)
            .hex()
          return [hazyColor, hazyColor, color, 0]
        }

        case 'outline': {
          return [
            CV.button_ghost_background_color,
            CV.button_border_color,
            color,
            1,
          ]
        }

        case 'ghost': {
          return [CV.button_ghost_background_color, color, color, 1]
        }

        case 'link':
          return [
            CV.button_ghost_background_color,
            CV.button_ghost_background_color,
            color,
            0,
          ]

        case 'primary':
        default:
          return [color, color, textColor, 0]
      }
    }, [
      CV.button_border_color,
      CV.button_ghost_background_color,
      CV.button_hazy_lightness,
      color,
      textColor,
      type,
    ])

  const buttonStyles: StyleProp<ViewStyle> = [
    STYLES.button,
    {
      height: CV[`button_${size}_height`],
      backgroundColor: _backgroundColor,
      borderColor: _borderColor,
      borderWidth: _borderWidth
        ? hairline
          ? StyleSheet.hairlineWidth
          : _borderWidth
        : _borderWidth,
    },
    STYLES[`button_${size}_padding_horizontal`],
    square ? STYLES.button_square : null,
    round ? STYLES.button_round : null,
    disabled ? STYLES.button_disabled : null,
    loading ? STYLES.button_loading : null,
    style,
  ]
  const commonTextStyle = StyleSheet.flatten<TextStyle>([
    STYLES.text,
    {
      fontSize: CV[`button_${size}_font_size`],
      color: _textColor,
      marginLeft: renderLeftIcon ? CV.button_icon_gap : 0,
    },
  ])

  const textStyleSummary = StyleSheet.flatten<TextStyle>([
    commonTextStyle,
    textStyle,
  ])
  const iconSize = CV[`button_${size}_loading_size`] || 24
  const iconColor = textStyleSummary.color as string

  const contextJSX = loading ? (
    <Loading
      type="spinner"
      color={iconColor}
      size={iconSize}
      textSize={textStyleSummary.fontSize}>
      {loadingText}
    </Loading>
  ) : (
    <>
      {renderLeftIcon ? renderLeftIcon(iconColor, iconSize) : null}
      <Text style={textStyleSummary} numberOfLines={1}>
        {!isNil(text) ? text : children}
      </Text>
    </>
  )

  return (
    <TouchableOpacity
      {...restProps}
      disabled={disabled || loading}
      style={buttonStyles}
      activeOpacity={CV.button_active_opacity}
      onPress={
        restProps.onPress
          ? onPressDebounceWait
            ? runOnPress
            : restProps.onPress
          : undefined
      }>
      {contextJSX}
    </TouchableOpacity>
  )
}

export default memo(Button)
