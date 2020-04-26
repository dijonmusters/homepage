import styled from 'styled-components'
import { Normalize } from 'styled-normalize'
import GlobalStyles from '../styles/globalStyles'
import StyledTheme from '../styles/StyledTheme'
import TitleProvider from '../context/Title'
import TodosProvider from '../context/Todos'

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
      <TodosProvider>
        <TitleProvider>
          <Normalize />
          <GlobalStyles />
          <Container>
            <Component {...pageProps} />
          </Container>
        </TitleProvider>
      </TodosProvider>
    </StyledTheme>
  )
}

export default App
