import TodoInput from '../components/TodoInput'
import TodosList from '../components/TodosList'
import TodoistLogin from '../components/TodoistLogin'
import useAuthentication from '../hooks/useAuthentication'

const TodosContainer = () => {
  const { isAuthenticated } = useAuthentication()

  return isAuthenticated() ? (
    <>
      <TodoInput />
      <TodosList />
    </>
  ) : (
    <TodoistLogin />
  )
}

export default TodosContainer
