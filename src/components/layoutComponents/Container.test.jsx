import { render, screen } from '@testing-library/react'
import { DarkThemeProvider } from '../../providers'
import { Container } from './Container'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {}
        }
    }

test('To Render Container with Text', () => {
    render(
        <DarkThemeProvider>
            <Container>Text in Container</Container>
        </DarkThemeProvider>
    )
    const linkElement = screen.getByText(/text in container/i)
    expect(linkElement).toBeInTheDocument()
})
