import { createContext, useState, useEffect, useContext } from 'react'
import useRequest from '../hooks/useRequest'

const Context = createContext()

const useTodos = () => useContext(Context)

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState()
  const [categories, setCategories] = useState()
  const [projects, setProjects] = useState()

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
      await request.post(`/tasks/${id}/close`)
      setTodos(todos.filter(t => t.id !== id))
    } catch (error) {
      console.log(`Failed to complete ${id}`)
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
    getData()
  }, [])

  const loading = !todos

  const exposed = {
    loading,
    addTodo,
    categories,
    getTodosFor,
    completeTodo,
    todos,
  }

  return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export { TodosProvider as default, useTodos }
