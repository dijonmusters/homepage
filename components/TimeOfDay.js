import styled from 'styled-components'
import useTime from '../hooks/useTime'

const Header = styled.header`
  height: 200px;
  background: linear-gradient(to left, #8f94fb, #4e54c8); /* sunset */
  /* background: linear-gradient(to left, #d76d77, #ffaf7b); */ /* sunrise */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  font-size: 3rem;
  font-weight: 300;
`

const Time = styled.h1`
  font-weight: 300;
  position: relative;
`

const Symbol = styled.span`
  font-size: 3rem;
  position: absolute;
  bottom: 1rem;
`

const TimeOfDay = () => {
  const { display, showPercentage } = useTime()

  return (
    <Header>
      <Time>
        {display}
        {showPercentage && <Symbol>%</Symbol>}
      </Time>
    </Header>
  )
}

export default TimeOfDay
