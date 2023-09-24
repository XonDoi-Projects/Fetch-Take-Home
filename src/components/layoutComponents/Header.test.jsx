import { render, screen } from '@testing-library/react'
import { DarkThemeProvider, SizeProvider, UserProvider } from '../../providers'
import { Header } from './Header'
import { BrowserRouter } from 'react-router-dom'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {}
        }
    }

test('To Render Header theme toggle Button', () => {
    render(
        <BrowserRouter>
            <DarkThemeProvider>
                <SizeProvider>
                    <UserProvider>
                        <Header />
                    </UserProvider>
                </SizeProvider>
            </DarkThemeProvider>
        </BrowserRouter>
    )
    const linkElement = screen.getByRole('button')
    expect(linkElement).toBeInTheDocument()
})
