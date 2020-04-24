import { useState, useEffect, createRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Todos from './Todos'

const Input = styled.input`
  line-height: 2;
  padding: 0 2rem;
  background: transparent;
  color: white;
  border: 1px solid #666;
  width: 100%;
  height: 8rem;
  font-size: 4rem;
  margin-bottom: 1rem;
`

const TodosContainer = () => {
  const [todos, setTodos] = useState()
  const inputRef = createRef()
  const [userInput, setUserInput] = useState('')

  const get = async type => {
    const token = localStorage.getItem('token')
    const url = `https://api.todoist.com/rest/v1/${type}`
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  }

  const set = async content => {
    setUserInput('')
    const token = localStorage.getItem('token')
    const url = 'https://api.todoist.com/rest/v1/tasks'
    const formData = { content }
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(url, formData, options)

    return data
  }

  const getTodos = async () => {
    const [tasks, projects] = await Promise.all([get('tasks'), get('projects')])
    const todos = tasks.map(t => ({
      id: t.id,
      title: t.content,
      category: projects.find(p => p.id === t.project_id).name,
      created: t.created,
    }))
    setTodos(todos)
  }

  const checkForEnter = async e => {
    if (e.key === 'Enter') {
      await set(userInput)
      getTodos()
    }
  }

  useEffect(() => {
    getTodos()
    inputRef.current && inputRef.current.focus()
  }, [])

  return (
    <>
      <Input
        ref={inputRef}
        onChange={e => setUserInput(e.target.value)}
        value={userInput}
        onKeyUp={checkForEnter}
      />
      {todos ? (
        <Todos todos={todos} refetch={getTodos} />
      ) : (
        <p>fetching todos</p>
      )}
    </>
  )
}

export default TodosContainer
