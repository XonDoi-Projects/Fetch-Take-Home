import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'
import { DarkThemeProvider } from '../../providers'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {}
        }
    }

test('To Render Spinner', () => {
    render(
        <DarkThemeProvider>
            <Spinner data-testid="test" />
        </DarkThemeProvider>
    )
    const linkElement = screen.getByTestId('test')
    expect(linkElement).toBeInTheDocument()
})
