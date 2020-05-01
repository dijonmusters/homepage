import TodosContainer from '../components/TodosContainer'
import TimeOfDay from '../components/TimeOfDay'

const Home = () => {
  return (
    <>
      <TimeOfDay />
      <TodosContainer />
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
