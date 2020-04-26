import { useState, useEffect } from 'react'
import styled from 'styled-components'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import setSeconds from 'date-fns/setSeconds'
import setMinutes from 'date-fns/setMinutes'
import setHours from 'date-fns/setHours'
import { useTitle } from '../context/Title'
import useTime from '../hooks/useTime'

const Percentage = styled.h1`
  font-size: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  margin: 0;
  padding: 0;
  font-weight: 300;
`

const getPercentage = (startTime, endTime) => {
  const totalSeconds = (endTime - startTime) * 60 * 60
  const now = new Date()

  const startOfDay = setHours(
    setMinutes(setSeconds(new Date(), 0), 0),
    startTime
  )

  const timeElapsed = differenceInSeconds(now, startOfDay)

  return Math.floor((timeElapsed / totalSeconds) * 100)
}

const subscribeToPercentage = (setPercentage, startTime, endTime) => () => {
  const interval = setInterval(() => {
    setPercentage(getPercentage(startTime, endTime))
  }, 1000)
  return () => {
    clearInterval(interval)
  }
}

const PercentageOfDay = () => {
  const { startTime, endTime } = useTime()

  const [percentage, setPercentage] = useState(
    getPercentage(startTime, endTime)
  )

  const { setPercentage: setTitle } = useTitle()
  setTitle(`${percentage}%`)

  useEffect(subscribeToPercentage(setPercentage, startTime, endTime))

  return <Percentage>{percentage}%</Percentage>
}

export default PercentageOfDay
