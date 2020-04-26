import TodosContainer from '../components/TodosContainer'
import TimeContainer from '../components/TimeContainer'

const Home = () => (
  <>
    <TimeContainer />
    <TodosContainer />
  </>
)

export default Home

// todo: move start, end and any other time based stuff to hook
// todo: dynamic title
// rewrite todo fetching logic
// rewrite login and token logic - attach to axios instance
// show 'mark as complete' instead of time since on hover
// show countdown on todo's undo until it is actually complete
// Show smart statement about being done with todos when empt
// Confettee
