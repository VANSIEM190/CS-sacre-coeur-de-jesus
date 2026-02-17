import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/refresh'
    ) {
      originalRequest._retry = true

      try {
        await axios.post(
          'http://localhost:3000/api/v1/refresh',
          {},
          { withCredentials: true }
        )

        return api(originalRequest)
      } catch {
        if (window.location.pathname !== '/admin/connexion') {
          window.location.href = '/admin/connexion'
        }
      }
    }

    return Promise.reject(error)
  }
)

export default api
