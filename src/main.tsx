import React    from 'react'
import ReactDOM from 'react-dom/client'
import App      from './App.jsx'

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider }  from './contexts/AuthContext.jsx'
import { basename }      from './config/server';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

  <BrowserRouter basename={basename}> 
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>

  </React.StrictMode>,
)
