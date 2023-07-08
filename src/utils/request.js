import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    /**
     * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
     * const token = getToken()
     * if (token) {
     *  config.headers.token = token
     * }
     */
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    /**
     * 根据项目实际情况来对 response 和 error 做处理
     */
    return response
  },
  (error) => {
    const { response } = error
    if (response && response.data) {
      return Promise.reject(error)
    }
    const { message } = error
    console.error(message)
    return Promise.reject(error)
  }
)

export default instance
