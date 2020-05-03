import Head from 'next/head'
import { useTodos } from '../context/Todos'
import useTime from '../hooks/useTime'

const Title = () => {
  const { todos } = useTodos()
  const { display, showPercentage } = useTime()

  const getTitle = () => {
    const titleBits = []
    showPercentage && titleBits.push(`${display}%`)

    if (todos) {
      const containsTodos = `${todos.length} tasks left`
      const noTodos = 'All done for the day!'
      titleBits.push(todos.length > 0 ? containsTodos : noTodos)
    }

    return titleBits.length > 0 ? titleBits.join(' | ') : 'Myday'
  }

  return (
    <Head>
      <title>{getTitle()}</title>
    </Head>
  )
}

export default Title
