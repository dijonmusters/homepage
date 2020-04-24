import styled from 'styled-components'
import { Normalize } from 'styled-normalize'
import GlobalStyles from '../styles/globalStyles'
import StyledTheme from '../styles/StyledTheme'

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  max-width: 768px;
  margin: 0 auto;
`

const App = ({ Component, pageProps }) => {
  return (
    <StyledTheme>
      <>
        <Normalize />
        <GlobalStyles />
        <Container>
          <Component {...pageProps} />
        </Container>
      </>
    </StyledTheme>
  )
}

export default App
