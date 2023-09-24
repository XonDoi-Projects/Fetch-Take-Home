import { render, screen } from '@testing-library/react'
import { DarkThemeProvider } from '../../providers'
import { Typography } from './Typography'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {}
        }
    }

test('To Render Typography with Text', () => {
    render(
        <DarkThemeProvider>
            <Typography>Text in Typography</Typography>
        </DarkThemeProvider>
    )
    const linkElement = screen.getByText(/text in typography/i)
    expect(linkElement).toBeInTheDocument()
})
