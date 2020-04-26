import { format, getHours } from 'date-fns'
import useLocalStorage from './useLocalStorage'

const useTime = () => {
  const storage = useLocalStorage()

  const startTime = parseInt(storage.get('startTime')) || 9
  const endTime = parseInt(storage.get('endTime')) || 18
  const workdays = JSON.parse(storage.get('workdays')) || [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
  ]

  const isWorkHours = () => {
    const now = new Date()
    const dayOfWeek = format(now, 'EEEE')
    const currentHour = getHours(now)

    return (
      workdays.includes(dayOfWeek) &&
      currentHour > startTime &&
      currentHour < endTime
    )
  }

  return {
    isWorkHours,
    startTime,
    endTime,
    workdays,
  }
}

export default useTime
