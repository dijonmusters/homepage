import { createContext, useState, useContext } from 'react'
import Head from 'next/head'
import { useTodos } from './Todos'

const Context = createContext()

const useTitle = () => useContext(Context)

const TitleProvider = ({ children }) => {
  const { todos } = useTodos()
  const [percentage, setPercentage] = useState()

  const getTitle = () => {
    const title = 'my-day'

    if (todos && percentage)
      return `${title} | ${percentage} | ${todos.length} tasks left`
    if (todos) return `${title} | ${todos.length} tasks left`
    if (percentage) return `${title} | ${percentage}`

    return title
  }

  const exposed = {
    setPercentage,
  }

  return (
    <Context.Provider value={exposed}>
      <Head>
        <title>{getTitle()}</title>
      </Head>
      {children}
    </Context.Provider>
  )
}

export { TitleProvider as default, useTitle }
