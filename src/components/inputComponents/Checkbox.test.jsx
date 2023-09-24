import { fireEvent, render, screen } from '@testing-library/react'
import { Checkbox } from './Checkbox'
import { DarkThemeProvider } from '../../providers'
import { useState } from 'react'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {}
        }
    }

describe('To test Checkbox interaction', () => {
    test('To Render Checkbox with label', () => {
        render(
            <DarkThemeProvider>
                <Checkbox label="Test" />
            </DarkThemeProvider>
        )

        expect(screen.getByText(/test/i)).toBeInTheDocument()
    })

    const TestCheckbox = () => {
        const [value, setValue] = useState('no')

        return (
            <DarkThemeProvider>
                <Checkbox value={value} onChange={setValue} />
            </DarkThemeProvider>
        )
    }

    test('To Render Checkbox click', () => {
        render(<TestCheckbox />)
        const linkElement = screen.getByRole('checkbox')

        fireEvent.click(linkElement)

        expect(linkElement).toBeChecked()
    })
})
