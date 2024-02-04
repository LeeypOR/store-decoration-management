import { needEncryptEnvironmentList } from '@/utils'
import { decrypt, encrypt } from '@/utils/encrypt'

/**
 * 1、自动化恢复session中的数据到store，
 * 2、自动同步vuex中的数据到session
 * @param {*} store
 */

const sessionStoragePlugin = store => {
  // 自动化恢复session中的数据到store
  const sessionState = {}
  Object.keys(window.sessionStorage).forEach(sessionName => {
    const obj = {}
    let value = window.sessionStorage.getItem(sessionName)
    if (needEncryptEnvironmentList.includes(window.location.hostname)) {
      value = decrypt(value)
    }
    let realValue = ''
    try {
      realValue = JSON.parse(value)
    } catch (e) {
      realValue = value
    }
    obj[sessionName] = realValue
    Object.assign(sessionState, obj)
  })
  store.replaceState(Object.assign({}, store.state, sessionState))
  // console.log('恢复完所有的session到vuex')

  // 自动同步vuex中的数据到session
  store.subscribe((mutation, state) => {
    Object.keys(state).forEach((stateName, index) => {
      let value = JSON.stringify(state[stateName])
      if (needEncryptEnvironmentList.includes(window.location.hostname)) {
        value = encrypt(value)
      }
      window.sessionStorage.setItem(
        stateName, value
      )
    })
    // console.log('同步了一个vuex到session')
  })
}
export default [sessionStoragePlugin]
