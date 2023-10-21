import { Toast } from 'antd-mobile'
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8888',
  timeout: 5000
})

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 简化返回数据
    return response.data
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 弹窗提示错误
    Toast.show({
      content: error.message,
      duration: 1000
    })
    return Promise.reject(error)
  }
)

export default request
