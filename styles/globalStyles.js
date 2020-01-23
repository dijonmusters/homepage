import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      box-sizing: border-box;
    }

    body {
      font-family: ${theme.fontFamily};
      font-weight: ${theme.baseFontWeight};
      color: ${theme.fontColor};
      font-size: ${theme.baseFontSize};
      background-color: ${theme.backgroundColor};
    }
  `}
`

export default GlobalStyles
