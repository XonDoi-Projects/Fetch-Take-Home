import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { DarkThemeProvider, SizeProvider, UserProvider } from './providers'
import { BrowserRouter } from 'react-router-dom'
import { DefaultFonts } from './components/DefaultFonts'
import { GlobalStyle } from './components/GlobalStyle'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <DefaultFonts />
        <GlobalStyle />
        <BrowserRouter>
            <SizeProvider>
                <DarkThemeProvider>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </DarkThemeProvider>
            </SizeProvider>
        </BrowserRouter>
    </React.StrictMode>
)
