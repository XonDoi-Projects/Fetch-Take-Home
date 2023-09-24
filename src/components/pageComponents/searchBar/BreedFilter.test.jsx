import { render, screen, waitFor } from '@testing-library/react'
import { BreedFilter } from './BreedFilter'
import { FETCH_BASE_URL } from '../../env'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { BrowserRouter } from 'react-router-dom'
import { DarkThemeProvider, SizeProvider, UserProvider } from '../../../providers'
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

const server = setupServer(
    rest.get(`${FETCH_BASE_URL}/dogs/breeds`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(['Breed 1', 'Breed 2']))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const TestBreedFilter = () => {
    const [breeds, setBreeds] = useState([])

    return (
        <BrowserRouter>
            <DarkThemeProvider>
                <SizeProvider>
                    <UserProvider>
                        <BreedFilter breeds={breeds} setBreeds={setBreeds} />
                    </UserProvider>
                </SizeProvider>
            </DarkThemeProvider>
        </BrowserRouter>
    )
}

test('To test BreedFilter list', async () => {
    render(<TestBreedFilter />)

    await waitFor(() => {
        const elements = screen.getAllByRole('checkbox')

        expect(elements.length).toBeGreaterThan(0)
    })
})
