import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { Login } from './Login'
import { Page } from '../layoutComponents'
import { Logout } from './Logout'

export const Main = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Page>
                        <Home />
                    </Page>
                }
            />
            <Route
                path="/login"
                element={
                    <Page>
                        <Login />
                    </Page>
                }
            />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    )
}
