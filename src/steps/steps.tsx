import React, { createContext, memo, useRef, useMemo } from 'react'
import type { FC } from 'react'
import { ScrollView, View } from 'react-native'

import Theme from '../theme'

import type { StepsPropsType } from './interface'
import Step from './step'
import { varCreator, styleCreator } from './style'

export const StepsContext = createContext<{
  current?: number
  data?: StepsPropsType['data']
}>({})

export const maxSteps = 3

const Steps: FC<StepsPropsType> = ({ current, data, style }) => {
  const TOKENS = Theme.useThemeTokens()
  const CV = Theme.createVar(TOKENS, varCreator)
  const STYLES = Theme.createStyle(CV, styleCreator, TOKENS)
  const ctx = useMemo(() => ({ current, data }), [current, data])
  const scrollRef = useRef<ScrollView>(null)

  const setScrollDistance = (width: number) => {
    if (scrollRef.current && data?.length > maxSteps) {
      scrollRef.current.scrollTo({
        x: (width / data?.length) * (current - 1 > 0 ? current - 1 : 0),
        y: 0,
      })
    }
  }
  const inner =
    data?.length > 0 ? (
      <View
        style={[STYLES.stepsBox, style]}
        onLayout={e => {
          setScrollDistance(e?.nativeEvent?.layout?.width)
        }}>
        <StepsContext.Provider value={ctx}>
          {data?.map((v, i) => {
            return <Step key={i} index={i} {...v} />
          })}
        </StepsContext.Provider>
      </View>
    ) : null

  return (
    <View style={STYLES.outWrap}>
      {data?.length > maxSteps ? (
        <ScrollView style={STYLES.scrollViewBox} horizontal ref={scrollRef}>
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
    </View>
  )
}

export default memo(Steps)
