import { render, screen } from '@testing-library/react'
import { Card } from './Card'
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

test('To Render Card with Text', () => {
    render(
        <DarkThemeProvider>
            <Card>Text in Card</Card>
        </DarkThemeProvider>
    )
    const linkElement = screen.getByText(/text in card/i)
    expect(linkElement).toBeInTheDocument()
})
