import isArray from 'lodash/isArray'
import noop from 'lodash/noop'
import React, { memo } from 'react'

import ActionSheet from '../action-sheet'
import { varCreator as varCreatorBlank } from '../blank/style'
import BottomBar from '../bottom-bar'
import Button from '../button'
import InitialValue from '../initial-value'
import Locale from '../locale'
import Space from '../space'
import Theme from '../theme'

import type { ButtonBarProps } from './interface'
import { varCreator, styleCreator } from './style'

const ButtonBar: React.FC<ButtonBarProps> = props => {
  const {
    alone = false,
    buttons,
    count = 4,
    moreText,
    blankSize = 'm',

    children,
    ...restProps
  } = InitialValue.useInitialProps('ButtonBar', props)
  const locale = Locale.useLocale().ButtonBar
  const TOKENS = Theme.useThemeTokens()
  const CV = Theme.createVar(TOKENS, varCreator)
  const CV_BLANK = Theme.createVar(TOKENS, varCreatorBlank)
  const STYLES = Theme.createStyle(CV, styleCreator)

  const realButtons = (buttons || []).filter(item => !item.hidden)
  const isConfig = isArray(buttons)
  const showMore = realButtons.length > count
  const bottomButtons = showMore ? realButtons.slice(0, count - 1) : realButtons

  const onPressMore = () => {
    const restButtons = realButtons.slice(count - 1)

    ActionSheet({
      actions: restButtons.map(item => item.text),
      cancelText: locale.labelActionSheetCancelText,
    })
      .then(({ index }) => {
        restButtons[index].onPress?.()
      })
      .catch(noop)
  }

  const defaultGap = CV_BLANK[`blank_size_${blankSize}`]

  return (
    <BottomBar
      {...restProps}
      style={[
        { paddingHorizontal: defaultGap },
        STYLES.button_bar,
        alone ? STYLES.button_bar_alone : null,
      ]}>
      {isConfig ? (
        <Space
          justify="flex-end"
          align="center"
          direction="horizontal"
          gapHorizontal={CV.button_bar_button_space}>
          {showMore ? (
            <Button
              type="link"
              text={moreText || locale.moreText}
              onPress={onPressMore}
            />
          ) : null}
          {bottomButtons.reverse().map((b, index) => {
            return (
              <Button
                key={index}
                {...b}
                size={b.size || 'm'}
                style={b.style || STYLES.btn}
              />
            )
          })}
        </Space>
      ) : (
        children
      )}
    </BottomBar>
  )
}

export default memo(ButtonBar)
