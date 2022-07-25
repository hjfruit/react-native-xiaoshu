import isNil from 'lodash/isNil'
import React, { memo } from 'react'

import InitialValue from '../initial-value'
import Locale from '../locale'
import Result from '../result'
import ResultIconEmpty from '../result/icons/result-icon-empty'
import Theme from '../theme'

import type { EmptyProps } from './interface'
import { varCreator, styleCreator } from './style'

/**
 * Empty 空元素
 * @description 用于填充空白数据。
 */
const Empty: React.FC<EmptyProps> = props => {
  const {
    text,
    style,
    textStyle,
    iconStyle,
    icon,
    full = false,
  } = InitialValue.useInitialProps('Empty', props)
  const locale = Locale.useLocale().Empty
  const TOKENS = Theme.useThemeTokens()
  const CV = Theme.createVar(TOKENS, varCreator)
  const STYLES = Theme.createStyle(CV, styleCreator)

  const iconJSX = !isNil(icon) ? (
    icon
  ) : (
    <ResultIconEmpty style={[STYLES.icon, iconStyle]} />
  )

  return (
    <Result
      status="info"
      renderIcon={() => iconJSX}
      style={[STYLES.empty, full ? STYLES.emptyFull : null, style]}
      subtitle={text || locale.text}
      subtitleTextStyle={[STYLES.text, textStyle]}
    />
  )
}

export default memo(Empty)
