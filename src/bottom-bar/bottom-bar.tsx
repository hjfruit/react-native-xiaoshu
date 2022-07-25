import React, { useMemo, useEffect, useState, memo } from 'react'
import type { ViewStyle, StyleProp } from 'react-native'
import { View, Keyboard, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { varCreator as varCreatorDivider } from '../divider/style'
import { getDefaultValue } from '../helpers'
import InitialValue from '../initial-value'
import Theme from '../theme'

import type { BottomBarProps } from './interface'
import { varCreator } from './style'

const BottomBar: React.FC<BottomBarProps> = props => {
  let {
    safeAreaInsetBottom = true,
    backgroundColor,
    height,
    hidden = false,
    keyboardShowNotRender = true,
    divider = true,

    style,
    ...restProps
  } = InitialValue.useInitialProps('BottomBar', props)
  const { bottom } = useSafeAreaInsets()
  const TOKENS = Theme.useThemeTokens()
  const CV = Theme.createVar(TOKENS, varCreator)
  const CV_DIVIDER = Theme.createVar(TOKENS, varCreatorDivider)
  const [keyboardShow, setKeyboardShow] = useState(false)

  // 监听键盘
  useEffect(() => {
    // 安卓才隐藏底部
    if (keyboardShowNotRender && Platform.OS === 'android') {
      // 注意如果你把 android:windowSoftInputMode 设置为 adjustResize 或是 adjustPan，则在 Android 上只有 keyboardDidShow 和 keyboardDidHide 事件有效。
      const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardShow(true)
      })
      const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardShow(false)
      })

      return () => {
        keyboardDidShow.remove()
        keyboardDidHide.remove()
      }
    }
  }, [keyboardShowNotRender])

  backgroundColor = getDefaultValue(
    backgroundColor,
    CV.bottom_bar_background_color,
  )
  height = getDefaultValue(height, CV.bottom_bar_height)

  const viewStyles = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        height: height + (safeAreaInsetBottom ? bottom : 0),
        paddingBottom: safeAreaInsetBottom ? bottom : 0,
        backgroundColor,
        borderTopColor: CV_DIVIDER.divider_color_light,
        borderTopWidth: divider ? 1 : 0,
      },
      style,
    ],
    [
      bottom,
      backgroundColor,
      divider,
      height,
      CV_DIVIDER.divider_color_light,
      safeAreaInsetBottom,
      style,
    ],
  )

  // 本身隐藏
  if (hidden || keyboardShow) {
    return null
  }

  return <View {...restProps} style={viewStyles} />
}

export default memo(BottomBar)
