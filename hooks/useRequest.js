import axios from 'axios'
import useLocalStorage from './useLocalStorage'

const useRequest = () => {
  const storage = useLocalStorage()
  const token = storage.get('token')

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const request = axios.create({
    baseURL: 'https://api.todoist.com/rest/v1',
    headers,
  })

  return request
}

export default useRequest
