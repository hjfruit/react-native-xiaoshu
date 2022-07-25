import React, { useState, useCallback, useEffect, memo } from 'react'
import type { ViewStyle } from 'react-native'
import { View, Text } from 'react-native'

import Button from '../button'
import { getDefaultValue } from '../helpers'
import { usePersistFn } from '../hooks'
import InitialValue from '../initial-value'
import Locale from '../locale'
import Result from '../result'
import Space from '../space'
import Theme from '../theme'

import type { ProgressPageProps } from './interface'
import Progress from './progress'
import { varCreator, styleCreator } from './style'

const ProgressPage: React.FC<ProgressPageProps> = props => {
  let {
    children,
    loading: loadingOut,
    backgroundColor,
    defaultPercentage = 10,
    fail,
    failMessage,
    failIcon,
    onPressReload,
    extraLoading,
  } = InitialValue.useInitialProps('ProgressPage', props)
  const locale = Locale.useLocale().ProgressPage
  const TOKENS = Theme.useThemeTokens()
  const CV = Theme.createVar(TOKENS, varCreator)
  const STYLES = Theme.createStyle(CV, styleCreator)

  backgroundColor = getDefaultValue(
    backgroundColor,
    CV.progress_page_background_color,
  )

  const [state, setState] = useState({
    loading: loadingOut,
    percentage: defaultPercentage,
    duration: 0,
    animated: false,
  })

  const onAnimationEnd = useCallback((n: number) => {
    if (n === 100) {
      // 延迟更改状态更顺畅，进度条是完整走完的
      setTimeout(() => {
        setState(s => ({
          ...s,
          loading: false,
        }))
      }, 0)
    }
  }, [])

  const onPressReloadPersistFn = usePersistFn(() => {
    onPressReload?.()
  })

  useEffect(() => {
    setState(s => {
      const isReload = !s.loading && loadingOut

      if (isReload) {
        return {
          ...s,
          loading: loadingOut,
          percentage: defaultPercentage,
          duration: 0,
          animated: false,
        }
      }

      return { ...s }
    })
  }, [defaultPercentage, loadingOut])

  useEffect(() => {
    // 做一个延迟，避免上下两次操作状态合并在一个中，reload 的时候丢失过渡状态
    setTimeout(() => {
      setState(s => {
        return {
          ...s,
          percentage: loadingOut ? 90 : 100,
          duration: loadingOut ? 1500 : 100,
          animated: true,
        }
      })
    }, 0)
  }, [loadingOut])

  const placeholderStyle: ViewStyle = {
    flex: 1,
    backgroundColor: backgroundColor,
  }

  if (state.loading) {
    return (
      <View style={placeholderStyle}>
        <Progress
          percentage={state.percentage}
          showPivot={false}
          animated={state.animated}
          animationDuration={state.duration}
          onAnimationEnd={onAnimationEnd}
          square
        />
        {extraLoading}
      </View>
    )
  }

  if (fail) {
    return (
      <Result
        style={STYLES.fail_page}
        status="warning"
        subtitle={
          <Space head gap="l" align="center">
            <Text style={STYLES.text}>{failMessage || locale.failMessage}</Text>
            {onPressReload ? (
              <Button
                style={STYLES.btn}
                text={locale.labelRefreshText}
                onPress={onPressReloadPersistFn}
              />
            ) : null}
          </Space>
        }
        renderIcon={() => {
          if (failIcon) {
            return failIcon
          }

          return <Result.IconWarning />
        }}
      />
    )
  }

  return children as React.ReactElement
}

export default memo<typeof ProgressPage>(ProgressPage)
