import React, { memo } from 'react'
import { Svg, Path } from 'react-native-svg'
import * as defaultVar from '../theme/default-var'
import * as helper from './helper'
import type { IconCommonFillProps } from './interface'

const Delete: React.FC<IconCommonFillProps> = ({
  size = helper.DEFAULT_SIZE,
  color = defaultVar.error,
}) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24">
      <Path
        d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm4.25 7h-8.5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 1 0 0-1.5z"
        fill={color}
        fill-rule="evenodd"
      />
    </Svg>
  )
}

export default memo(Delete)