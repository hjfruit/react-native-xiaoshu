import isUndefined from 'lodash/isUndefined'
import React, { useMemo, useContext, createContext, memo } from 'react'

import type { InitialValue, InitialValueProps } from './interface'

const InitialValueContext = createContext<InitialValue>({})

export const useInitialValue = () => useContext(InitialValueContext)

export const useInitialProps = <T,>(componentName: string, props: T): T => {
  const initialValue = useContext(InitialValueContext)[componentName] ?? {}
  const v: T = { ...props }

  Object.keys(v).forEach(key => {
    if (isUndefined(v[key]) && !isUndefined(initialValue[key])) {
      v[key] = initialValue[key]
    }
  })

  return v
}

const InitialValueProvider: React.FC<InitialValueProps> = ({
  children,
  initialValue,
}) => {
  const state = useMemo<InitialValue>(
    () => ({
      ...initialValue,
    }),
    [initialValue],
  )

  return (
    <InitialValueContext.Provider value={state}>
      {children}
    </InitialValueContext.Provider>
  )
}

export default memo<typeof InitialValueProvider>(InitialValueProvider)
