import type { ErrorInfo } from 'react'
import React, { PureComponent } from 'react'
import type { ViewStyle } from 'react-native'

import Result from '../result'
import Button from '../button'
import type { ErrorBoundaryProps } from './interface'

type ErrorBoundaryState = {
  error: Error
}

const ERROR_PAGE_STYLE: ViewStyle = {
  flex: 1,
}

/**
 * ErrorBoundary 错误捕获
 * @description 一般用于应用根组件，捕获 React 内产生的问题。
 */
class ErrorBoundary extends PureComponent<ErrorBoundaryProps> {
  state: ErrorBoundaryState = {
    error: null,
  }

  static getDerivedStateFromError(error: Error) {
    // 更新 state，下次渲染可以展示错误相关的 UI
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  /**
   * 点击清空错误，重新渲染子组件
   */
  onPressReload = () => {
    this.setState({
      error: null,
    })
  }

  render() {
    if (this.state.error) {
      // 渲染出错时的 UI
      if (this.props.renderError) {
        return this.props.renderError({
          name: this.state.error.name,
          message: this.state.error.message,
          onReset: this.onPressReload,
        })
      }

      return (
        <Result
          style={ERROR_PAGE_STYLE}
          status="error"
          title={this.props.title || '加载失败，请稍后再试~'}
          subtitle={`${this.state.error.name}\n${this.state.error.message}`}
          extra={
            <Button
              type="primary"
              size="small"
              text={this.props.reloadText || '重新加载'}
              onPress={this.onPressReload}
            />
          }
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary