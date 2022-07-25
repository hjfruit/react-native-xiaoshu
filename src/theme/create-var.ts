import isNil from 'lodash/isNil'

import type { TokensType } from './interface'

type Creator<T> = (v: TokensType) => T

type KeyType = [TokensType, Creator<any>]

const VarMap: Map<KeyType, any> = new Map()

export const createVar = <T>(token: TokensType, creator: Creator<T>): T => {
  let myVar: T

  for (let [key, value] of VarMap) {
    if (key[1] === creator) {
      if (key[0] === token) {
        myVar = value
      } else {
        VarMap.delete(key)
      }
    }
  }

  if (!myVar) {
    myVar = creator(token)
    // 变量覆盖
    Object.keys(myVar).forEach(field => {
      if (!isNil(token[field])) {
        myVar[field] = token[field]
      }
    })

    VarMap.set([token, creator], myVar)
  }

  return myVar
}
