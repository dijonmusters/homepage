import { useState } from 'react'
import styled from 'styled-components'
import { formatDistanceToNow } from 'date-fns'
import { useTodos } from '../context/Todos'
import Filters from './Filters'

const Card = styled.div`
  text-align: left;
  padding: 1rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  border-left: 2px solid transparent;

  &:hover {
    border-left: 2px solid mintcream;
    transform: scale(1.01);
    cursor: pointer;
  }

  &:last-child {
    border-bottom: none;
  }
`

const Title = styled.span`
  flex: 1;
  text-decoration: ${props => (props.isUndoable ? 'line-through' : 'none')};
`

const StyledDate = styled.span`
  margin-left: 1rem;
  flex-shrink: 0;
`

const Todos = () => {
  const [selected, setSelected] = useState('All')
  const [undoableActions, setUndoableActions] = useState([])
  const { loading, categories: filters, getTodosFor, completeTodo } = useTodos() // finish this

  if (loading) return <p>Loading todos...</p>

  const todos = getTodosFor(selected)

  const flagForCompletion = id => async e => {
    const timeout = setTimeout(async () => {
      await completeTodo(id)
      const removedUndoableActions = undoableActions.filter(a => a.id !== id)
      setUndoableActions(removedUndoableActions)
    }, 3000)

    setUndoableActions([...undoableActions, { id, timeout }])
  }

  const undoAction = id => e => {
    const action = undoableActions.find(a => a.id === id)
    clearTimeout(action.timeout)
    const removedUndoableActions = undoableActions.filter(a => a.id !== id)
    setUndoableActions(removedUndoableActions)
  }

  const renderTodo = ({ id, title, created }) => {
    const isUndoable = undoableActions.find(a => a.id === id)
    const then = new Date(created)
    return (
      <Card key={title}>
        <Title onClick={flagForCompletion(id)} isUndoable={isUndoable}>
          {title}
        </Title>
        {isUndoable ? (
          <span onClick={undoAction(id)}>Undo</span>
        ) : (
          <StyledDate>{formatDistanceToNow(then)} ago</StyledDate>
        )}
      </Card>
    )
  }

  return (
    <>
      <Filters
        filters={filters}
        selected={selected}
        setSelected={setSelected}
      />
      {todos.map(renderTodo)}
    </>
  )
}

export default Todos
