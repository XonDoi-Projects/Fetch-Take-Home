import { render, screen } from '@testing-library/react'
import { DarkThemeProvider } from '../../providers'
import { OptionButton } from './OptionButton'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {}
        }
    }

test('To Render OptionButton with Text', () => {
    render(
        <DarkThemeProvider>
            <OptionButton item={'test'} />
        </DarkThemeProvider>
    )
    const linkElement = screen.getByText(/test/i)
    expect(linkElement).toBeInTheDocument()
})
