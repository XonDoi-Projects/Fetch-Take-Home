import { fireEvent, render, screen } from '@testing-library/react'
import { Autocomplete } from './Autocomplete'
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

test('To Render Autocomplete with option', () => {
    render(
        <DarkThemeProvider>
            <Autocomplete list={['test']} />
        </DarkThemeProvider>
    )
    const linkElement = screen.getByRole('button')

    fireEvent.click(linkElement)

    expect(screen.getByText(/test/i)).toBeInTheDocument()
})
