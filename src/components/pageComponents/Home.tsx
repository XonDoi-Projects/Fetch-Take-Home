import { useState } from 'react'
import { useSize, useUser } from '../../providers'
import { Container } from '../layoutComponents'
import { Typography } from '../layoutComponents/Typography'
import { SearchBar } from './searchBar'
import { Dog } from '../../api'
import { DogGrid, Sort } from './grid/DogGrid'

export const Home = () => {
    const mobile = useSize()
    const { user } = useUser()

    const [breeds, setBreeds] = useState<string[]>([])
    const [zipCodes, setZipCodes] = useState<string[]>([])
    const [ageMin, setAgeMin] = useState<number>()
    const [ageMax, setAgeMax] = useState<number>()

    const [size, setSize] = useState('25')
    const [from, setFrom] = useState('0')
    const [dogs, setDogs] = useState<Dog[]>([])
    const [total, setTotal] = useState<string>('')
    const [sort, setSort] = useState<Sort>({ breed: 'asc' })

    const [loading, setLoading] = useState(false)

    const [dirty, setDirty] = useState(true)

    //api call to get dogs

    return (
        <Container
            sx={{
                flexDirection: 'column',
                flex: 1,
                padding: '20px',
                justifyContent: 'flex-start',
                alignItems: 'center',
                overflow: 'hidden'
            }}
        >
            <Container
                sx={{
                    flexDirection: 'row',
                    flex: 1,
                    gap: '50px',
                    width: '100%',
                    height: '100%'
                }}
            >
                {mobile.mobile ? (
                    <></>
                ) : (
                    <SearchBar
                        size={size}
                        setSize={setSize}
                        from={from}
                        setFrom={setFrom}
                        breeds={breeds}
                        setBreeds={setBreeds}
                        zipCodes={zipCodes}
                        setZipCodes={setZipCodes}
                        ageMin={ageMin}
                        setAgeMin={setAgeMin}
                        ageMax={ageMax}
                        setAgeMax={setAgeMax}
                        setDogs={setDogs}
                        setLoading={setLoading}
                        dirty={dirty}
                        setDirty={setDirty}
                        setTotal={setTotal}
                        sort={sort}
                    />
                )}
                <Container sx={{ flexDirection: 'column', flex: 1, padding: '10px' }}>
                    <Typography variant="title">{`Hi ${user?.name},`}</Typography>
                    <Typography sx={{ marginBottom: '20px' }}>
                        Let's find you the perfect dog!
                    </Typography>
                    <DogGrid
                        total={total}
                        dogs={dogs}
                        from={from}
                        setFrom={setFrom}
                        size={size}
                        setSize={setSize}
                        loading={loading}
                        setDirty={setDirty}
                        sort={sort}
                        setSort={setSort}
                    />
                </Container>
            </Container>
        </Container>
    )
}
