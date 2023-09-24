/* eslint-disable testing-library/no-container */
import { render, screen } from '@testing-library/react'
import { DarkThemeProvider } from '../../providers'
import { useState } from 'react'
import { Popup } from './Popup'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {}
        }
    }

const TestPopup = () => {
    const [show, setShow] = useState(true)
    return (
        <DarkThemeProvider>
            <Popup show={show} onClose={() => setShow(false)}>
                Text in Popup
            </Popup>
        </DarkThemeProvider>
    )
}

test('To Render Popup with Text', () => {
    render(<TestPopup />)

    expect(screen.getByText(/text in popup/i)).toBeInTheDocument()
})
