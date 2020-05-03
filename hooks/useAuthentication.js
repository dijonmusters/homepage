import { useState, useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

const useAuthentication = () => {
  const storage = useLocalStorage()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(!!storage.get('token'))
  })

  return { isAuthenticated }
}

export default useAuthentication
