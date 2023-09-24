import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from './Button'
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

describe('To test Button interaction', () => {
    test('To Render Button with text', () => {
        render(
            <DarkThemeProvider>
                <Button>Text in Button</Button>
            </DarkThemeProvider>
        )
        const linkElement = screen.getByRole('button')

        fireEvent.click(linkElement)

        expect(screen.getByText(/text in button/i)).toBeInTheDocument()
    })

    test('To Render Button click', () => {
        render(
            <DarkThemeProvider>
                <Button onClick={(e) => (e.currentTarget.textContent = 'clicked')}>
                    Text in Button
                </Button>
            </DarkThemeProvider>
        )
        const linkElement = screen.getByRole('button')

        fireEvent.click(linkElement)

        expect(screen.getByText(/clicked/i)).toBeInTheDocument()
    })
})
