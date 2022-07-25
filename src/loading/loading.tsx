import isNil from 'lodash/isNil'
import React, { isValidElement, memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { getDefaultValue } from '../helpers'
import InitialValue from '../initial-value'
import Theme from '../theme'

import type { LoadingProps } from './interface'
import Circular from './loading-circular'
import Spinner from './loading-spinner'
import { varCreator } from './style'

/**
 * Loading 加载
 * 加载图标，用于表示加载中的过渡状态。
 */
const Loading: React.FC<LoadingProps> = props => {
  const {
    children,
    style,
    textStyle,
    size,
    color,
    textSize,
    vertical = false,
    type = 'circular',

    ...restProps
  } = InitialValue.useInitialProps('Loading', props)
  const TOKENS = Theme.useThemeTokens()
  const CV = Theme.createVar(TOKENS, varCreator)
  const ICON_COLOR = getDefaultValue(color, CV.loading_icon_color)
  const ICON_SIZE = getDefaultValue(size, CV.loading_icon_size)

  const textJSX = !isNil(children) ? (
    isValidElement(children) ? (
      children
    ) : (
      <Text
        style={StyleSheet.flatten([
          {
            fontSize: textSize || CV.loading_text_font_size,
            color: color || CV.loading_text_color,
            marginLeft: vertical ? 0 : CV.loading_gap,
            marginTop: vertical ? CV.loading_gap : 0,
          },
          textStyle,
        ])}>
        {children}
      </Text>
    )
  ) : null

  return (
    <View
      {...restProps}
      style={StyleSheet.flatten([
        STYLES.loading,
        vertical ? STYLES.loading_vertical : null,
        style,
      ])}>
      {type === 'circular' ? (
        <Circular size={ICON_SIZE} color={ICON_COLOR} />
      ) : (
        <Spinner size={ICON_SIZE} color={ICON_COLOR} />
      )}
      {textJSX}
    </View>
  )
}

const STYLES = StyleSheet.create({
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loading_vertical: {
    flexDirection: 'column',
  },
})

export default memo(Loading)
