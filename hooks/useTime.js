import { useState, useEffect } from 'react'
import {
  format,
  getHours,
  differenceInSeconds,
  setSeconds,
  setMinutes,
  setHours,
} from 'date-fns'
import useLocalStorage from './useLocalStorage'

const useTime = () => {
  const storage = useLocalStorage()

  const startTime = parseInt(storage.get('startTime')) || 9
  const endTime = parseInt(storage.get('endTime')) || 17
  const workdays = JSON.parse(storage.get('workdays')) || [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
  ]

  const getPercentage = () => {
    const totalSeconds = (endTime - startTime) * 60 * 60
    const now = new Date()

    const startOfDay = setHours(
      setMinutes(setSeconds(new Date(), 0), 0),
      startTime
    )

    const timeElapsed = differenceInSeconds(now, startOfDay)

    return Math.floor((timeElapsed / totalSeconds) * 100)
  }

  const getTime = () => format(new Date(), 'HH:mm')

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

  const getDisplay = () => (isWorkHours() ? getPercentage() : getTime())

  const [display, setDisplay] = useState(getDisplay())

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay(getDisplay())
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  })

  const showPercentage = isWorkHours()

  return {
    showPercentage,
    display,
  }
}

export default useTime
