import axios from 'axios'
import url from './config'

const baseUrl = url + 'api/tokenCheck'

const userCheck = async (token) => {
  if (!token || typeof token !== 'string') {
    return { error: 'Missing token', status: 400 }
  }

  try {
    const response = await axios.get(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    const status = error?.response?.status
    return {
      error: error?.response?.data?.error || 'Token check failed',
      status,
    }
  }
}

export default { userCheck }
