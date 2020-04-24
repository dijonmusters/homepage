import PercentageOfDay from '../components/PercentageOfDay'
import TimeOfDay from '../components/TimeOfDay'
import TodosContainer from '../components/TodosContainer'
import TodoistLogin from '../components/TodoistLogin'
import { isWorkHours } from '../utils/chrono'

const isAuthenticated = () =>
  typeof window !== 'undefined' && !!localStorage.getItem('token')

const Home = () => (
  <>
    {isWorkHours() ? (
      <PercentageOfDay startTime={startTime} endTime={endTime} />
    ) : (
      <TimeOfDay />
    )}
    {isAuthenticated() ? <TodosContainer /> : <TodoistLogin />}
  </>
)

export default Home

// rewrite todo fetching logic
// rewrite login and token logic - attach to axios instance
// show 'mark as complete' instead of time since on hover
// show countdown on todo's undo until it is actually complete
// Show smart statement about being done with todos when empt
// Confettee
