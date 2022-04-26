/**
 * title: 时间段选择
 * desc: 单个时间选择器。
 */

import React, { useState } from 'react'
import { Cell, Field } from '@fruits-chain/react-native-xiaoshu'

const formatValueText = (
  _: [Date, Date],
  __: any,
  s: [string, string],
): [string, string] => {
  return [s[0], s[1]]
}

const BasicFieldDateRange: React.FC = () => {
  const [value, setValue] = useState<[Date, Date]>([new Date(), new Date()])

  return (
    <Cell.Group title="Field Date Range">
      <Field.DateRange
        title="标题:非受控"
        placeholder={['请选择', '请选择']}
        datePickerTitle="选择时间吗"
      />
      <Field.DateRange
        title="自定义文案:非受控"
        placeholder={['请选择', '请选择']}
        formatValueText={formatValueText}
        clearable
        textAlign="left"
      />
      <Field.DateRange
        title="标题:非受控:禁用"
        placeholder={['请选择', '请选择']}
        editable={false}
      />
      <Field.DateRange
        title="标题:非受控:Y-D"
        placeholder={['请选择', '请选择']}
        mode="Y-D"
      />
      <Field.DateRange
        title="标题:受控不更新"
        placeholder={['请选择', '请选择']}
        value={value}
        mode="Y-m"
      />
      <Field.DateRange
        vertical
        title="标题:受控不更新"
        placeholder={['请选择', '请选择']}
        value={value}
        mode="Y-m"
      />
      <Field.DateRange
        title="标题:受控"
        value={value}
        mode="Y-m"
        onChange={setValue}
        divider={false}
        clearable
        placeholder={['自己动手丰衣足食', '自己动手丰衣足食']}
      />
    </Cell.Group>
  )
}

export default BasicFieldDateRange