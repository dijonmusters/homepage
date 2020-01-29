import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  fontFamily: 'sans-serif',
  baseFontWeight: 300,
  fontColor: 'white',
  baseFontSize: '16px',
  backgroundColor: '#FFB6C1',
  fontColorDark: '#555',
}

const StyledTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default StyledTheme
