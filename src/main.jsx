import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SnackbarProvider,  } from 'notistack';
import './index.css'
import App from './App.jsx'
import { setAppElement } from 'react-modal'
import { ErrorBoundary } from 'react-error-boundary';
import {useEffect} from 'react';

function usefallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  
  return (
    <div role="alert">
      {console.error(error)}
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={usefallbackRender}>
      <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <App />
      </SnackbarProvider>
    </ErrorBoundary>
  </StrictMode>,
)
