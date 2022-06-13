import GlobalStyles from './assets/styles/global';
import { DefaultTheme, ThemeProvider } from 'styled-components'
import defaultTheme from './assets/styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme as DefaultTheme}>
      <GlobalStyles />
      <h1>MyContacts</h1>
    </ThemeProvider>
  );
}

export default App;
