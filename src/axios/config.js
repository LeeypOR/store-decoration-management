// export const BASE_URL = process.env.NODE_ENV === 'development' ? 'https://testsd.cicd.vpclub.cn/ubp/union/central/admin' : `${ location.origin }/ubp/union/central/admin`
export const BASE_URL = `${ location.origin }/goldenhome/ghs/admin` // vue.config.js 加了代理，所以这里可以访问到接口
// export const UPLOAD_URL = process.env.NODE_ENV === 'development' ? 'https://testsd.cicd.vpclub.cn/goldenhome/ghs/admin' : `${ location.origin }/goldenhome/ghs/admin`
