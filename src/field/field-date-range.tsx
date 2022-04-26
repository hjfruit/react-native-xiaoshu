import isUndefined from 'lodash/isUndefined'
import omit from 'lodash/omit'
import React, { useMemo, memo } from 'react'
import type { TextStyle, StyleProp } from 'react-native'
import { Keyboard } from 'react-native'

import Cell from '../cell'
import { varCreator as varCreatorCell } from '../cell/style'
import DatePicker from '../date-picker'
import { renderDate } from '../date-picker/date-picker-range-view'
import type { DatePickerRangeValue } from '../date-picker/interface'
import { getDefaultValue, renderTextLikeJSX } from '../helpers'
import { useControllableValue, usePersistFn } from '../hooks'
import IconSwapRightOutline from '../icon/swap-right'
import { varCreator as varCreatorTextInput } from '../text-input/style'
import TextInputClear from '../text-input/text-input-clear'
import Theme from '../theme'

import type { FieldDateRangeProps } from './interface'

const FieldDateRange: React.FC<FieldDateRangeProps> = ({
  mode = 'Y-D',
  min,
  max,
  renderLabel,
  confirmButtonText,
  resetButtonText,
  formatValueText,
  datePickerTitle,
  isLink = true,
  editable = true,
  clearable = false,
  placeholder,
  placeholderTextColor,

  valueStyle,
  valueTextStyle,
  textAlign = 'right',
  ...restProps
}) => {
  if (restProps.vertical) {
    textAlign = 'left'
  }

  const TOKENS = Theme.useThemeTokens()
  const CV_CELL = Theme.createVar(TOKENS, varCreatorCell)
  const CV_TEXT_INPUT = Theme.createVar(TOKENS, varCreatorTextInput)

  // 修正数据
  placeholderTextColor = getDefaultValue(
    placeholderTextColor,
    CV_TEXT_INPUT.text_input_placeholder_text_color,
  )

  const [value, onChange] =
    useControllableValue<DatePickerRangeValue>(restProps)
  const valueTexts = useMemo<[string, string]>(
    () =>
      value?.[0] && value[1]
        ? [renderDate(value[0], mode), renderDate(value[1], mode)]
        : undefined,
    [value, mode],
  )

  const hasValue = !isUndefined(valueTexts)

  const valueTextStyles = useMemo<StyleProp<TextStyle>>(() => {
    return [
      {
        color: CV_CELL.cell_value_text_color,
        fontSize: CV_CELL.cell_font_size,
        lineHeight: CV_CELL.cell_title_line_height,
      },
      valueTextStyle,
      !hasValue
        ? {
            color: placeholderTextColor,
          }
        : null,
    ]
  }, [
    CV_CELL.cell_font_size,
    CV_CELL.cell_title_line_height,
    CV_CELL.cell_value_text_color,
    valueTextStyle,
    hasValue,
    placeholderTextColor,
  ])

  const onPress = usePersistFn(() => {
    Keyboard.dismiss()

    DatePicker.range({
      defaultValue: value,
      mode,
      min,
      max,
      renderLabel,
      confirmButtonText,
      resetButtonText,
      title: datePickerTitle,
    }).then(({ action, values: _values }) => {
      if (action === 'confirm') {
        onChange(_values)
      }
    })
  })

  const swapRightJSX = (
    <IconSwapRightOutline
      size={16}
      color={CV_CELL.cell_icon_color}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: TOKENS.space_1 / 2,
      }}
    />
  )
  const showTexts =
    hasValue && formatValueText
      ? formatValueText(value, mode, valueTexts)
      : valueTexts

  return (
    <Cell
      {...omit(restProps, ['value', 'defaultValue', 'onChange'])}
      disabled={!editable}
      onPress={onPress}
      valueStyle={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:
            textAlign === 'left'
              ? 'flex-start'
              : textAlign === 'center'
              ? 'center'
              : 'flex-end',
        },
        valueStyle,
      ]}
      value={
        hasValue ? (
          <>
            {renderTextLikeJSX(showTexts[0], valueTextStyles)}
            {swapRightJSX}
            {renderTextLikeJSX(showTexts[0], valueTextStyles)}
          </>
        ) : (
          <>
            {placeholder?.[0]
              ? renderTextLikeJSX(placeholder[0], valueTextStyles)
              : null}
            {swapRightJSX}
            {placeholder?.[1]
              ? renderTextLikeJSX(placeholder[1], valueTextStyles)
              : null}
          </>
        )
      }
      isLink={value && clearable ? false : isLink}
      valueExtra={
        value && clearable ? (
          <>
            {restProps.valueExtra}
            <TextInputClear
              onPress={() => {
                onChange(undefined)
              }}
            />
          </>
        ) : (
          restProps.valueExtra
        )
      }
    />
  )
}

export default memo(FieldDateRange)