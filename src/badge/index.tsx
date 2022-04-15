import isNil from 'lodash/isNil'
import React, { memo } from 'react'
import type { ViewStyle, StyleProp } from 'react-native'
import { View, Text } from 'react-native'

import Theme from '../theme'

import type { BadgeProps } from './interface'
import { varCreator, styleCreator } from './style'

/**
 * Badge 徽标
 * @description 在右上角展示徽标数字或小红点。
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  count,
  dot,
  max,
  color,
  style,
  countStyle,
  countTextStyle,
  loading = false,
  showZero = false,
  offset,
  status,
}) => {
  const TOKENS = Theme.useThemeTokens()
  const CV = Theme.createVar(TOKENS, varCreator)
  const STYLES = Theme.createStyle(CV, styleCreator)

  if (!isNil(max) && typeof count === 'number' && count > max) {
    count = `${max}+`
  }

  const hasCount = !isNil(count) && (count === 0 ? showZero : true)
  const countStyles: StyleProp<ViewStyle> = [
    STYLES.count,
    {
      backgroundColor:
        color || CV[`badge_status_${status}`] || CV.badge_background_color,
    },
    dot ? STYLES.count_dot : null,
    !isNil(children)
      ? [
          STYLES.count_fixed,
          dot ? STYLES.count_dot_fixed : null,
          offset
            ? {
                transform: [
                  {
                    translateX: offset[0],
                  },
                  {
                    translateY: offset[1],
                  },
                ],
              }
            : null,
        ]
      : [],
    countStyle,
  ]

  const badgeJSX =
    !loading && (hasCount || dot) ? (
      <View style={countStyles}>
        {dot ? null : (
          <Text style={[STYLES.count_text, countTextStyle]}>{count}</Text>
        )}
      </View>
    ) : null

  return (
    <View style={[STYLES.badge, style]} collapsable={false}>
      {badgeJSX}
      {children}
    </View>
  )
}

export default memo<typeof Badge>(Badge)
