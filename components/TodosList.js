import { useState } from 'react'
import styled from 'styled-components'
import { formatDistanceToNow } from 'date-fns'
import confetti from 'canvas-confetti'
import { useTodos } from '../context/Todos'
import Filters from './Filters'
import { FiCircle, FiCheckCircle } from 'react-icons/fi'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Todos = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  color: #444;
`

const Todo = styled.p`
  margin: 0;
  padding: 2rem 0;
  border-top: solid 1px #efefef;
  display: flex;
  align-items: center;
`

const Left = styled.span`
  flex: 1;
  padding-left: 2rem;
`

const Icon = styled.span`
  font-size: 1.5rem;
  padding: 1rem;
  margin-right: 1rem;
  > svg {
    display: block;
  }
`

const Text = styled.span`
  display: block;
  ${props => props.isComplete && 'text-decoration: line-through'};
`

const SubText = styled.span`
  display: block;
  color: #afafaf;
  ${props => props.isComplete && 'text-decoration: line-through'};
`

const TodosList = () => {
  const { loading, getTodosFor, completeTodo, undoCompleteTodo } = useTodos()
  const [currentFilter, setCurrentFilter] = useState('All')

  const handleCompleteToggle = (id, isComplete) => e => {
    const options = {
      particleCount: 200,
      origin: { y: e.clientY / window.innerHeight },
    }

    !isComplete && confetti(options)
    isComplete ? undoCompleteTodo(id) : completeTodo(id)
  }

  const renderTodo = ({ id, title, isComplete, created }) => (
    <Todo key={id}>
      <Left>
        <Text isComplete={isComplete}>{title}</Text>
        <SubText isComplete={isComplete}>
          {formatDistanceToNow(new Date(created))} ago
        </SubText>
      </Left>
      <Icon onClick={handleCompleteToggle(id, isComplete)}>
        {isComplete ? (
          <FiCheckCircle color="green" />
        ) : (
          <FiCircle color="#dfdfdf" />
        )}
      </Icon>
    </Todo>
  )

  if (loading) return <p>Loading todos...</p>

  const todos = getTodosFor(currentFilter)

  return (
    <Container>
      <Filters
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
      <Todos>{todos.map(renderTodo)}</Todos>
    </Container>
  )
}

export default TodosList
