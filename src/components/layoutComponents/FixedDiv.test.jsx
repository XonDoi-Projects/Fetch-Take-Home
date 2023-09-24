import { render, screen } from '@testing-library/react'
import { DarkThemeProvider } from '../../providers'
import { FixedDiv } from './FixedDiv'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {}
        }
    }

test('To Render FixedDiv with Text', () => {
    render(
        <DarkThemeProvider>
            <FixedDiv>Text in FixedDiv</FixedDiv>
        </DarkThemeProvider>
    )
    const linkElement = screen.getByText(/text in fixeddiv/i)
    expect(linkElement).toBeInTheDocument()
})
