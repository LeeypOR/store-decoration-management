import CryptoJS from 'crypto-js'

export const decrypt = (word, key = 'fb21f92598c745d192ef3dd7dad59cae', iv = '8f42f9081cb02d0e') => {
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(iv)
  let decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
export const encrypt = (word, key = 'fb21f92598c745d192ef3dd7dad59cae', iv = '8f42f9081cb02d0e') => {
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(iv)
  let encrypted = CryptoJS.AES.encrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}

export const md5Encrypt = (str) => {
  if (!str) return ''
  return CryptoJS.MD5(str.toString()).toString() || ''
}
