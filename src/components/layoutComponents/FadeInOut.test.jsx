import { render, screen } from '@testing-library/react'
import { DarkThemeProvider } from '../../providers'
import { useState } from 'react'
import { FadeInOut } from './FadeInOut'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {}
        }
    }

const TestFadeInOut = () => {
    const [show, setShow] = useState(true)
    return (
        <DarkThemeProvider>
            <FadeInOut show={show} dismissable onClose={() => setShow(false)}>
                Text in FadeInOut
            </FadeInOut>
        </DarkThemeProvider>
    )
}

test('To Render FadeInOut with Text', () => {
    render(<TestFadeInOut />)

    expect(screen.getByText(/text in fadeinout/i)).toBeInTheDocument()
})
