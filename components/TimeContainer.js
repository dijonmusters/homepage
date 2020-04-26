import PercentageOfDay from '../components/PercentageOfDay'
import TimeOfDay from '../components/TimeOfDay'
import useTime from '../hooks/useTime'

const TimeContainer = () => {
  const { isWorkHours } = useTime()

  return isWorkHours() ? <PercentageOfDay /> : <TimeOfDay />
}

export default TimeContainer
