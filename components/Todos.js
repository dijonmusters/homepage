import { useState } from 'react'
import styled from 'styled-components'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'

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

const FilterContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
`

const Filter = styled.span`
  padding: 0 2rem;
  text-decoration: ${props => props.isSelected && 'underline'};
  border-right: 1px solid white;

  &:last-child {
    border-right: none;
  }

  &:hover {
    cursor: pointer;
  }
`

const StyledDate = styled.span`
  margin-left: 1rem;
  flex-shrink: 0;
`

const Filters = ({ filters, selected, setSelected }) => {
  const changeFilter = newSelected => e => setSelected(newSelected)

  return (
    <FilterContainer>
      <Filter isSelected={selected === 'All'} onClick={changeFilter('All')}>
        All
      </Filter>
      {filters.map(f => (
        <Filter key={f} isSelected={selected === f} onClick={changeFilter(f)}>
          {f}
        </Filter>
      ))}
    </FilterContainer>
  )
}

const completeTodo = async id => {
  const url = `https://api.todoist.com/rest/v1/tasks/${id}/close`
  const token = localStorage.getItem('token')
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.post(url, {}, options)
}

const Todos = ({ todos, refetch }) => {
  const filters = [...new Set(todos.map(t => t.category))]
  const [selected, setSelected] = useState('All')
  const [undoableActions, setUndoableActions] = useState([])

  const filteredTodos =
    selected !== 'All' ? todos.filter(t => t.category === selected) : todos

  const flagForCompletion = id => async e => {
    const timeout = setTimeout(async () => {
      await completeTodo(id)
      await refetch()
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
      {filteredTodos.map(renderTodo)}
    </>
  )
}

export default Todos
