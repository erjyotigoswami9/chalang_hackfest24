import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <BrowserRouter>
        <Provider store={store}>
           <App />
        </Provider>
        </BrowserRouter>
    </AuthProvider>
    ,
)
