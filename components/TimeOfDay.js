import { useState, useEffect } from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'

const Time = styled.h1`
  font-size: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  margin: 0;
  padding: 0;
  font-weight: 300;
`

const getTime = () => {
  return format(new Date(), 'HH:mm')
}

const subscribeToTime = setTime => () => {
  const interval = setInterval(() => {
    const time = getTime()
    setTime(time)
  }, 1000)
  return () => {
    clearInterval(interval)
  }
}

const TimeOfDay = () => {
  const [time, setTime] = useState(getTime())

  useEffect(subscribeToTime(setTime))

  return <Time>{time}</Time>
}

export default TimeOfDay
