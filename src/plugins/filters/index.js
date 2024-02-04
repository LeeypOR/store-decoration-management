import {findNameInOptions} from '@/utils'


/**
 * 手机号隐藏。如13277924031 => 132****4031
 * @param {*} tel 手机号
 * @param {*} start 隐藏的开始位，包含该位，默认4
 * @param {*} end 隐藏截至位，包含该位， 默认7
 */
export const $hiddenPhone = (tel, start = 4, end = 7) => {
  if (!tel) return '手机号不存在'
  else {
    start--
    let firstPart = tel.slice(0, start)
    let hiddenPart = ''.padStart((end - start), '*')
    let lastPart = tel.slice(end, tel.length)
    return `${ firstPart }${ hiddenPart }${ lastPart }`
  }
}

export const $pointToYuan = (val) => {
  if (!+val) return `0`
  else return `￥ ${ val / 100 }`
}

export const $pointToYuanUnit = (val, unit = '元') => {
  if (!+val) return `0${ unit }`
  else return `${ val / 100 }${ unit }`
}

export const $amountUnit = (value, unit = '元') => {
  if (!+value) return `0${ unit }`
  else return `${ value }${ unit }`
}

// 分转元
export const $number2Price = (number) => {
  number = +number
  if (!number) return '0'
  return (number / 100).toFixed(2)
}
export const $findNameInOptions = (value, options = []) => {
  return findNameInOptions(options, value)
}