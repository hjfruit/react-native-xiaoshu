import type { TouchableWithoutFeedbackProps, FlexStyle } from 'react-native'

import type { FixHitSlopProps } from '../helpers/types'

export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around'

export type FlexAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'

export interface FlexProps
  extends FixHitSlopProps<TouchableWithoutFeedbackProps> {
  /**
   * 项目定位方向
   */
  direction?: FlexStyle['flexDirection']

  /**
   * 子元素的换行方式
   */
  wrap?: FlexStyle['flexWrap']

  /**
   * 子元素在主轴上的对齐方式
   */
  justify?: FlexJustify

  /**
   * 子元素在交叉轴上的对齐方式
   */
  align?: FlexAlign
}

export interface FlexItemProps
  extends FixHitSlopProps<TouchableWithoutFeedbackProps> {
  flex?: FlexStyle['flex']
}
