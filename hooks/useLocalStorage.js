const useLocalStorage = () => {
  const get = key => typeof window !== 'undefined' && localStorage.getItem(key)

  const set = (key, data) =>
    typeof window !== 'undefined' && localStorage.setItem(key, data)

  return { get, set }
}

export default useLocalStorage
