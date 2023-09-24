import { fireEvent, render, screen } from '@testing-library/react'
import { DarkThemeProvider } from '../../providers'
import { Cover } from './Cover'
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

const TestCoverDismiss = () => {
    const [show, setShow] = useState(true)
    return (
        <DarkThemeProvider>
            <Cover data-testid={'test'} show={show} dismissable onClose={() => setShow(false)} />
        </DarkThemeProvider>
    )
}

test('To Render Cover that hides on click', () => {
    render(<TestCoverDismiss />)

    expect(screen.getByTestId('test')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('test'))
    expect(screen.queryByTestId('test')).toBeNull()
})
