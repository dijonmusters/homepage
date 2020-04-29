import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  fontFamily: 'sans-serif',
  baseFontWeight: 300,
  fontColor: '#444',
  baseFontSize: '16px',
  backgroundColor: 'white',
  fontColorDark: '#555',
}

const StyledTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default StyledTheme
