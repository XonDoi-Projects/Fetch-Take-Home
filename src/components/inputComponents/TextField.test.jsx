import { render, screen } from '@testing-library/react'
import { TextField } from './TextField'
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

test('To Render TextField with input', () => {
    render(
        <DarkThemeProvider>
            <TextField value="test" />
        </DarkThemeProvider>
    )
    const element = screen.getByRole('textbox')

    expect(element).toHaveValue('test')
})
