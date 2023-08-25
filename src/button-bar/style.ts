import { StyleSheet } from 'react-native'

import type { TokensType } from '../theme/interface'

export const varCreator = (TOKENS: TokensType) => {
  return {
    button_bar_button_space: TOKENS.space_2,
    button_bar_button_min_width: 92,
  }
}

type ComponentVars = ReturnType<typeof varCreator>

export const styleCreator = (cv: ComponentVars) => {
  return StyleSheet.create({
    button_bar: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexShrink: 1,
      flexGrow: 1,
    },

    button_bar_alone: {
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
    },

    btn: {
      minWidth: cv.button_bar_button_min_width,
    },
  })
}
