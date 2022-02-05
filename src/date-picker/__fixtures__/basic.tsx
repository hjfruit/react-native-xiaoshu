/**
 * title: 综合用法
 * desc: 把各种场景、API 都运用了
 */

import React from 'react'
import { ScrollView } from 'react-native'

import {
  DatePicker,
  Button,
  CellGroup,
  Space,
} from '@fruits-chain/react-native-xiaoshu'

const Y_M_LIMIT = {
  min: new Date(2016, 6, 20, 18, 40, 10),
  max: new Date(2026, 2, 10, 12, 20, 50),
}

const BasicDatePickerView: React.FC = () => {
  return (
    <ScrollView>
      <CellGroup title="单选" bodyPaddingHorizontal>
        <Space>
          <Button
            text="单选:Promise"
            onPress={() => {
              DatePicker({
                title: '某个时间',
              }).then(({ action, value }) => {
                console.log('单选:Promise  =>>  action  =>', action)
                console.log('单选:Promise  =>>  value  =>', value)
              })
            }}
          />
          <Button
            text="单选:beforeClose:Promise"
            onPress={() => {
              DatePicker({
                title: '某个时间',
                beforeClose: (action, value) => {
                  console.log(
                    '单选:beforeClose:Promise   =>  action  => ',
                    action,
                  )
                  console.log(
                    '单选:beforeClose:Promise   =>  value  => ',
                    value,
                  )

                  return new Promise<boolean>(resolve => {
                    setTimeout(() => {
                      resolve(true)
                    }, 2000)
                  })
                },
              })
            }}
          />
          <Button
            text="单选:Y-D:Promise"
            onPress={() => {
              DatePicker({
                title: '某个时间',
                mode: 'Y-D',
              }).then(({ action, value }) => {
                console.log('单选:Y-D:Promise  =>>  action  =>', action)
                console.log('单选:Y-D:Promise  =>>  value  =>', value)
              })
            }}
          />
          <Button
            text="单选:最大最小时间:Promise"
            onPress={() => {
              DatePicker({
                ...Y_M_LIMIT,
                title: '某个时间',
              }).then(({ action, value }) => {
                console.log(
                  '单选:最大最小时间:Promise  =>>  action  =>',
                  action,
                )
                console.log('单选:最大最小时间:Promise  =>>  value  =>', value)
              })
            }}
          />
        </Space>
      </CellGroup>

      <CellGroup title="日期段" bodyPaddingHorizontal>
        <Space>
          <Button
            text="日期段:Y-D:Promise"
            onPress={() => {
              DatePicker.range({
                title: '什么时间',
              }).then(({ action, values }) => {
                console.log('日期段:Y-D:Promise  =>>  action  =>', action)
                console.log('日期段:Y-D:Promise  =>>  values  =>', values)
              })
            }}
          />
          <Button
            text="日期段:Y-m:Promise"
            onPress={() => {
              DatePicker.range({
                title: '什么时间',
                mode: 'Y-m',
              }).then(({ action, values }) => {
                console.log('日期段:Y-m:Promise  =>>  action  =>', action)
                console.log('日期段:Y-m:Promise  =>>  values  =>', values)
              })
            }}
          />
          <Button
            text="日期段:[null, null]?"
            onPress={() => {
              DatePicker.range({
                title: '什么时间',
                mode: 'Y-m',
                defaultValue: [null, null],
              }).then(({ action, values }) => {
                console.log('日期段:Y-m:Promise  =>>  action  =>', action)
                console.log('日期段:Y-m:Promise  =>>  values  =>', values)
              })
            }}
          />
          <Button
            text="日期段:[new Date(), null]?"
            onPress={() => {
              DatePicker.range({
                ...Y_M_LIMIT,
                title: '什么时间',
                mode: 'Y-m',
                defaultValue: [new Date(), null],
              }).then(({ action, values }) => {
                console.log('日期段:Y-m:Promise  =>>  action  =>', action)
                console.log('日期段:Y-m:Promise  =>>  values  =>', values)
              })
            }}
          />
          <Button
            text="日期段:[null, new Date()]?"
            onPress={() => {
              DatePicker.range({
                ...Y_M_LIMIT,
                title: '什么时间',
                mode: 'Y-m',
                defaultValue: [null, new Date()],
              }).then(({ action, values }) => {
                console.log('日期段:Y-m:Promise  =>>  action  =>', action)
                console.log('日期段:Y-m:Promise  =>>  values  =>', values)
              })
            }}
          />
        </Space>
      </CellGroup>
    </ScrollView>
  )
}

export default BasicDatePickerView