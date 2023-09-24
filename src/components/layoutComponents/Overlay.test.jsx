import { render, screen } from '@testing-library/react'
import { DarkThemeProvider, SizeProvider } from '../../providers'
import { Overlay } from './Overlay'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {}
        }
    }

test('To Render Overlay with Text', () => {
    render(
        <DarkThemeProvider>
            <SizeProvider>
                <Overlay>Text in Overlay</Overlay>
            </SizeProvider>
        </DarkThemeProvider>
    )
    const linkElement = screen.getByText(/text in overlay/i)
    expect(linkElement).toBeInTheDocument()
})
