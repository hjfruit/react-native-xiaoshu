import React, { memo } from 'react'

import { attachPropertiesToComponent } from '../helpers'
import Portal from '../portal'

import type { PopupProps, PopupPageProps } from './interface'
import Popup from './popup'
import PopupHeader from './popup-header'
import PopupPage from './popup-page'

/**
 * Popup 弹出层
 * @description 弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。
 */
const PopupContainer: React.FC<PopupProps> = props => {
  return (
    <Portal>
      <Popup {...props} />
    </Portal>
  )
}

const PopupPageContainer: React.FC<PopupPageProps> = props => {
  return (
    <Portal>
      <PopupPage {...props} />
    </Portal>
  )
}

export default attachPropertiesToComponent(
  memo<typeof PopupContainer>(PopupContainer),
  {
    Component: Popup,
    Header: PopupHeader,
    Page: PopupPageContainer,
    PageComponent: PopupPage,
  },
)
