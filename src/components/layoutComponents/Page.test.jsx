import { render, screen } from '@testing-library/react'
import { DarkThemeProvider, SizeProvider, UserProvider } from '../../providers'
import { Page } from './Page'
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

test('To Render Page with Text', () => {
    render(
        <BrowserRouter>
            <DarkThemeProvider>
                <SizeProvider>
                    <UserProvider>
                        <Page>Text in Page</Page>
                    </UserProvider>
                </SizeProvider>
            </DarkThemeProvider>
        </BrowserRouter>
    )
    const linkElement = screen.getByText(/text in page/i)
    expect(linkElement).toBeInTheDocument()
})
