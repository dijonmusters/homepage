import Head from 'next/head'
import { useTodos } from '../context/Todos'
import useTime from '../hooks/useTime'

const Title = () => {
  const { todos } = useTodos()
  const { display, showPercentage } = useTime()

  const getTitle = () => {
    const titleBits = ['my-day']
    showPercentage && titleBits.push(`${display}%`)
    todos && titleBits.push(`${todos.length} tasks left`)

    return titleBits.join(' | ')
  }

  return (
    <Head>
      <title>{getTitle()}</title>
    </Head>
  )
}

export default Title
