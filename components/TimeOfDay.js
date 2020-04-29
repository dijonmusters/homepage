import styled from 'styled-components'

import useTime from '../hooks/useTime'

const Time = styled.h1`
  font-weight: 300;
`

const Symbol = styled.span`
  font-size: 3rem;
`

const TimeOfDay = () => {
  const { display, showPercentage } = useTime()

  return (
    <Time>
      {display}
      {showPercentage && <Symbol>%</Symbol>}
    </Time>
  )
}

export default TimeOfDay
