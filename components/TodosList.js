import { useState } from 'react'
import styled from 'styled-components'
import { formatDistanceToNow } from 'date-fns'
import confetti from 'canvas-confetti'
import { useTodos } from '../context/Todos'
import Filters from './Filters'
import { FiCircle, FiCheckCircle } from 'react-icons/fi'
import NewTodo from './NewTodo'
import useGradient from '../hooks/useGradient'
import { useMediaQuery } from 'react-responsive'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${({ isSmallScreen }) => isSmallScreen && 'margin-bottom: 6rem'};
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
  border-left: 3px solid transparent;

  &:hover {
    cursor: pointer;
    border-left: 3px solid ${({ color }) => `rgb(${color})`};
  }
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
  const { middle } = useGradient()
  const isSmallScreen = useMediaQuery({ maxWidth: 800 })

  const handleCompleteToggle = (id, isComplete) => e => {
    const options = {
      particleCount: 200,
      origin: {
        y: e.clientY / window.innerHeight,
        x: e.clientX / window.innerHeight,
      },
    }

    !isComplete && confetti(options)
    isComplete ? undoCompleteTodo(id) : completeTodo(id)
  }

  const renderTodo = ({ id, title, isComplete, created }) => (
    <Todo
      key={id}
      onClick={handleCompleteToggle(id, isComplete)}
      color={middle}
    >
      <Left>
        <Text isComplete={isComplete}>{title}</Text>
        <SubText isComplete={isComplete}>
          {formatDistanceToNow(new Date(created))} ago
        </SubText>
      </Left>
      <Icon>
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
    <Container isSmallScreen={isSmallScreen}>
      <Filters
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
      <Todos>{todos.map(renderTodo)}</Todos>
      <NewTodo />
    </Container>
  )
}

export default TodosList
