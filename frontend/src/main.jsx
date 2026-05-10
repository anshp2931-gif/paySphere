import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { StyledEngineProvider, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'
import store from './store/store'
import './index.css'
import App from './App.jsx'

const GOOGLE_CLIENT_ID = "250441239388-ldget7kv1v1hvf6vm1r6b0p48fassv43.apps.googleusercontent.com";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <HelmetProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </HelmetProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
