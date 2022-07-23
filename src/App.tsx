import Router from './Router';
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools />
      </ThemeProvider>
    </>
  );
}

export default App;
