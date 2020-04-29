import { FiCircle, FiCheckCircle } from 'react-icons/fi'
import TodosContainer from '../components/TodosContainer'
import TimeOfDay from '../components/TimeOfDay'
import styled from 'styled-components'

const Header = styled.header`
  height: 250px;
  background: linear-gradient(to left, #8f94fb, #4e54c8); /* sunset */
  /* background: linear-gradient(to left, #d76d77, #ffaf7b); */ /* sunrise */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  font-size: 3rem;
  font-weight: 300;
`

const Todos = styled.div`
  flex: 1;
  background: white;
  color: #444;
`

const Todo = styled.p`
  margin: 0;
  padding: 2rem;
  border-bottom: solid 1px #efefef;
  position: relative;
`

const Icon = styled.span`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
`

const Text = styled.span`
  display: block;
  ${props => props.isCompleted && 'text-decoration: line-through'};
`

const SubText = styled.span`
  display: block;
  color: #afafaf;
  ${props => props.isCompleted && 'text-decoration: line-through'};
`

const todos = [
  { title: 'one todo', isCompleted: false },
  { title: 'another todo', isCompleted: true },
  { title: 'yet another todo', isCompleted: false },
]

const Home = () => {
  return (
    <>
      <Header>
        <TimeOfDay />
      </Header>
      <Todos>
        {todos.map(t => (
          <Todo key={t.title}>
            <Text isCompleted={t.isCompleted}>{t.title}</Text>
            <SubText isCompleted={t.isCompleted}>one month ago</SubText>
            <Icon>
              {t.isCompleted ? (
                <FiCheckCircle color="green" />
              ) : (
                <FiCircle color="#dfdfdf" />
              )}
            </Icon>
          </Todo>
        ))}
      </Todos>
      {/*
      <TodosContainer /> */}
    </>
  )
}
export default Home

// implement new design
//  - floating footer for input?
//  - gradient slowly change across day
//  - finish implementing confetti

// show loading feedback in input
// show 'mark as complete' instead of time since on hover
// show countdown on todo's undo until it is actually complete
// websockets for todos added elsewhere
