import { format, getHours } from 'date-fns'

const isWorkHours = (
  startTime = 9,
  endTime = 17,
  workDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday']
) => {
  const now = new Date()
  const dayOfWeek = format(now, 'EEEE')
  const currentHour = getHours(now)
  return (
    workDays.includes(dayOfWeek) &&
    currentHour > startTime &&
    currentHour < endTime
  )
}

export { isWorkHours }
