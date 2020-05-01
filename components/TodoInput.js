import { useState, useEffect, createRef } from 'react'
import styled from 'styled-components'
import { useTodos } from '../context/Todos'

const Input = styled.input`
  line-height: 2;
  padding: 0 2rem;
  background: transparent;
  color: #444;
  border: 1px solid #666;
  width: 100%;
  height: 8rem;
  font-size: 4rem;
  margin-bottom: 1rem;
`

const NewTodoInput = () => {
  const { addTodo } = useTodos()
  const inputRef = createRef()
  const [userInput, setUserInput] = useState('')

  const checkForEnter = async e => {
    if (e.key === 'Enter') {
      await addTodo(userInput)
      setUserInput('')
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
