import { default as axios } from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

export const Instance = axios.create({
  baseURL: process.env.VUE_APP_DATAURL,
  timeout: 1000 * 60
})

Instance.use = function(fn) {
  const realFn = fn.bind(this)
  const newFn = (...args) => realFn(...args)
  newFn.use = this.use
  return newFn
}

Instance.interceptors.request.use(config => {
  config.headers['Keen-Token'] = `Bearer ${getToken()}`
  if (config.method === 'get' && config.data) {
    config.url += '?'
    const keys = Object.keys(config.data)
    for (const key of keys) {
      config.url += `${key}=${encodeURIComponent(config.data[key])}&`
    }
    config.url = config.url.substring(0, config.url.length - 1)
    config.data = {}
  }
  return config
}
)

Instance.interceptors.response.use(res => {
  // const res = response.data
  if (res.data.code && res.data.code !== 200) {
    Message({
      message: res.data.msg || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    // 当token过期或者不存在时，后台返回状态码401，此时页面跳转到登录页面
    if (res.data.code === 401) {
      // to re-login
      MessageBox.confirm('您的会话已过期，是否重新登陆？', '重新登陆', {
        confirmButtonText: '重新登陆',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    return Promise.reject(new Error(res.data.msg || 'Error'))
  } else {
    // 是否是下载
    if (res.headers['content-disposition']) {
      const disposition = res.headers['content-disposition']
      const fileName = disposition.substring(
        disposition.indexOf('filename=') + 9,
        disposition.length
      )
      return Promise.resolve({
        fileName,
        blob: res.data
      })
    } else {
      return Promise.resolve(res.data)
    }
  }
}, error => {
  console.log('err' + error) // for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export const $instance = Instance
