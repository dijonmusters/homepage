import { useState, useEffect, createRef } from 'react'
import styled from 'styled-components'
import { useTodos } from '../context/Todos'

const Input = styled.input`
  line-height: 2;
  background: transparent;
  color: #666;
  font-weight: 200;
  width: 100%;
  margin: 0 2rem;
  font-size: 2rem;
  border: 0;
`

const NewTodoInput = ({ closeModal }) => {
  const { addTodo } = useTodos()
  const inputRef = createRef()
  const [userInput, setUserInput] = useState('')

  const checkForEnter = e => {
    if (e.key === 'Enter') {
      closeModal()
      addTodo(userInput)
    }
  }

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  return (
    <Input
      ref={inputRef}
      onChange={e => setUserInput(e.target.value)}
      value={userInput}
      onKeyUp={checkForEnter}
    />
  )
}

export default NewTodoInput
