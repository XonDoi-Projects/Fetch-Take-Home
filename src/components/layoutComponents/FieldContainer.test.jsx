import { render, screen } from '@testing-library/react'
import { DarkThemeProvider } from '../../providers'
import { FieldContainer } from './FieldContainer'
import { TextField } from '../inputComponents'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {}
        }
    }

describe('Test FieldContainer Label and Error Text', () => {
    test('To Render FieldContainer Label', () => {
        render(
            <DarkThemeProvider>
                <FieldContainer label="Test"></FieldContainer>
            </DarkThemeProvider>
        )
        const linkElement = screen.getByText(/test/i)
        expect(linkElement).toBeInTheDocument()
    })

    test('To Render FieldContainer Error Text', () => {
        render(
            <DarkThemeProvider>
                <FieldContainer label="Test"></FieldContainer>
            </DarkThemeProvider>
        )
        const linkElement = screen.getByText(/test/i)
        expect(linkElement).toBeInTheDocument()
    })

    test('To Render FieldContainer Input', () => {
        render(
            <DarkThemeProvider>
                <FieldContainer>
                    <TextField type="text" />
                </FieldContainer>
            </DarkThemeProvider>
        )
        const linkElement = screen.getByRole('textbox')
        expect(linkElement).toBeInTheDocument()
    })
})
