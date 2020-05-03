import TodosList from '../components/TodosList'
import TodoistLogin from '../components/TodoistLogin'
import useAuthentication from '../hooks/useAuthentication'
import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  display: flex;
`

const TodosContainer = () => {
  const { isAuthenticated } = useAuthentication()

  return (
    <Container>{isAuthenticated ? <TodosList /> : <TodoistLogin />}</Container>
  )
}

export default TodosContainer
