import PercentageOfDay from '../components/PercentageOfDay'
import Todos from '../components/Todos'
import Options from '../components/Options'

const Home = () => {
  return (
    <>
      <Options />
      <PercentageOfDay />
      <Todos />
    </>
  )
}

export default Home

// Only display percentage during work hours
// Show motivational quote when not working - Enjoy having time off
// Add Todo cards
// Only show work todos during work hours
// optional due dates
// Get points
// Confettee
