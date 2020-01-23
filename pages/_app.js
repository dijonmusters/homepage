import styled from 'styled-components'
import { Normalize } from 'styled-normalize'
import GlobalStyles from '../styles/globalStyles'
import StyledTheme from '../styles/StyledTheme'

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const App = ({ Component, pageProps }) => (
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

export default App
