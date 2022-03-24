import type { TokensType } from '../theme'

export const varCreator = (TOKENS: TokensType) => {
  return {
    bottom_bar_background_color: TOKENS.white,
    bottom_bar_height: 50,
  }
}