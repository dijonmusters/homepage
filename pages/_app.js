import styled from 'styled-components'
import { Normalize } from 'styled-normalize'
import GlobalStyles from '../styles/globalStyles'
import StyledTheme from '../styles/StyledTheme'
import Title from '../components/Title'
import TodosProvider from '../context/Todos'

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
`

const App = ({ Component, pageProps }) => {
  return (
    <StyledTheme>
      <TodosProvider>
        <Normalize />
        <GlobalStyles />
        <Title />
        <Container>
          <Component {...pageProps} />
        </Container>
      </TodosProvider>
    </StyledTheme>
  )
}

export default App
