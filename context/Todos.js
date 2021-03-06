import { createContext, useState, useEffect, useContext } from 'react'
import useRequest from '../hooks/useRequest'
import useAuthentication from '../hooks/useAuthentication'

const Context = createContext()

const useTodos = () => useContext(Context)

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState()
  const [categories, setCategories] = useState()
  const [projects, setProjects] = useState()

  const { isAuthenticated } = useAuthentication()
  const request = useRequest()

  const getFromTodoist = async type => {
    const { data } = await request.get(`/${type}`)
    return data
  }

  const sendToTodoist = async content => {
    const { data } = await request.post('/tasks', { content })
    return data
  }

  const transformTodo = todo => ({
    id: todo.id,
    title: todo.content,
    category: projects.find(p => p.id === todo.project_id).name,
    created: todo.created,
  })

  const addTodo = async todo => {
    try {
      const newTodo = await sendToTodoist(todo)
      const transformedTodo = transformTodo(newTodo)
      setTodos([...todos, transformedTodo])
    } catch (error) {
      console.log(`Failed to add todo: ${todo}`)
    }
  }

  const completeTodo = async id => {
    try {
      const decoratedTodos = todos.map(t =>
        t.id === id ? { ...t, isComplete: true } : t
      )
      setTodos(decoratedTodos)
      await request.post(`/tasks/${id}/close`)
    } catch (error) {
      console.log(`Failed to complete ${id}`)
    }
  }

  const undoCompleteTodo = async id => {
    try {
      const decoratedTodos = todos.map(t =>
        t.id === id ? { ...t, isComplete: false } : t
      )
      setTodos(decoratedTodos)
      await request.post(`/tasks/${id}/reopen`)
    } catch (error) {
      console.log(`Failed to undo complete ${id}`)
    }
  }

  const getTodosFor = category =>
    category !== 'All' ? todos.filter(t => t.category === category) : todos

  const getData = async () => {
    const allProjects = await getFromTodoist('projects')
    const tasks = await getFromTodoist('tasks')

    const transformedTodos = tasks.map(t => ({
      id: t.id,
      title: t.content,
      category: allProjects.find(p => p.id === t.project_id).name,
      created: t.created,
    }))

    setProjects(allProjects)

    const uniqueCategories = [
      'All',
      ...new Set(transformedTodos.map(t => t.category)),
    ]
    setCategories(uniqueCategories)
    setTodos(transformedTodos)
  }

  useEffect(() => {
    isAuthenticated && getData()
  }, [isAuthenticated])

  const loading = !todos

  const exposed = {
    loading,
    addTodo,
    categories,
    getTodosFor,
    completeTodo,
    undoCompleteTodo,
    todos,
  }

  return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export { TodosProvider as default, useTodos }
