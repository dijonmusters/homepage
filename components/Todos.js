import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
  padding: 2rem;
`

const Title = styled.h1`
  margin: 0;
  font-weight: 400;
`

const TodoPanel = styled.div`
  flex: 1;
`

const CardContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
`

const Card = styled.div`
  min-height: 2rem;
  width: 20rem;
  background: white;
  color: ${({ theme }) => theme.fontColorDark};
  margin-bottom: 2rem;
  margin-right: 1rem;
  transition: scale 0.1s ease-in-out;

  &:hover {
    scale: 1.05;
    cursor: pointer;
  }

  &:last-child {
    margin-right: 0;
    margin-bottom: 0;
  }
`

const Content = styled.div`
  padding: ${props => (props.thin ? '1rem' : '2rem')};
  text-align: center;
  border-bottom: 1px solid #ddd;
`

const ActionPanel = styled.div`
  display: flex;
`

const ActionItem = styled.div`
  flex: 1;
  text-align: center;
  padding: 1rem;
  border-right: 1px solid #eee;

  &:hover {
    background-color: #eee;
  }

  &:last-child {
    border-right: none;
  }
`

const PlusIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`

const todos = [
  {
    title: 'Build the interface',
    isCompleted: false,
    category: 'Work',
  },
  {
    title: 'Distinguish work from play',
    isCompleted: false,
    category: 'Personal',
  },
  {
    title: 'Build percentage UI',
    isCompleted: true,
    category: 'Personal',
  },
]

const personal = todos.filter(t => t.category === 'Personal')
const work = todos.filter(t => t.category === 'Work')
const separatedTodos = [
  { title: 'Personal', list: personal },
  { title: 'Work', list: work },
]

const renderTodo = ({ title }) => (
  <Card key={title}>
    <Content>{title}</Content>
    <ActionPanel>
      <ActionItem>
        <FontAwesomeIcon icon={faTrash} />
      </ActionItem>
      <ActionItem>
        <FontAwesomeIcon icon={faCheck} />
      </ActionItem>
    </ActionPanel>
  </Card>
)

const renderPlusIcon = () => (
  <CardContainer>
    <Card>
      <Content thin>
        <PlusIcon icon={faPlus} />
        Add todo
      </Content>
    </Card>
  </CardContainer>
)

const renderTodoPanel = ({ title, list }) => (
  <TodoPanel>
    <Title>{title}</Title>
    <CardContainer>{list.map(renderTodo)}</CardContainer>
    {renderPlusIcon()}
  </TodoPanel>
)

const Todos = () => {
  return <Container>{separatedTodos.map(renderTodoPanel)}</Container>
}

export default Todos
