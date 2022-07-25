import React, { memo } from 'react'
import { View } from 'react-native'

import InitialValue from '../initial-value'
import Theme from '../theme'

import type { BlankProps } from './interface'
import { varCreator } from './style'

const getGapValue = (v: boolean | number, initialValue: number) => {
  return typeof v === 'boolean' ? (v ? initialValue : 0) : v
}

const Blank: React.FC<BlankProps> = props => {
  let {
    left = true,
    right = true,
    top = false,
    bottom = false,
    size = 'm',
    type = 'margin',

    children,
    style,
    ...restProps
  } = InitialValue.useInitialProps('Blank', props)
  const TOKENS = Theme.useThemeTokens()
  const CV = Theme.createVar(TOKENS, varCreator)
  const defaultGap = CV[`blank_size_${size}`]

  // 重置值
  left = getGapValue(left, defaultGap)
  right = getGapValue(right, defaultGap)
  top = getGapValue(top, defaultGap)
  bottom = getGapValue(bottom, defaultGap)

  return (
    <View
      {...restProps}
      style={[
        {
          [`${type}Left`]: left,
          [`${type}Right`]: right,
          [`${type}Top`]: top,
          [`${type}Bottom`]: bottom,
        },
        style,
      ]}>
      {children}
    </View>
  )
}

export default memo(Blank)
