import useLocalStorage from './useLocalStorage'

const useAuthentication = () => {
  const storage = useLocalStorage()

  const isAuthenticated = () => !!storage.get('token')

  return { isAuthenticated }
}

export default useAuthentication
