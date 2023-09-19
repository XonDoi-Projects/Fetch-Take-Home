import { useState } from 'react'
import { useSize, useUser } from '../../providers'
import { Container } from '../layoutComponents'
import { Typography } from '../layoutComponents/Typography'
import { SearchBar } from './searchBar'
import { Dog } from '../../api'
import { DogGrid } from './grid/DogGrid'

export const Home = () => {
    const mobile = useSize()
    const { user } = useUser()

    const [breeds, setBreeds] = useState<string[]>([])
    const [zipCodes, setZipCodes] = useState<string[]>([])
    const [ageMin, setAgeMin] = useState<number>()
    const [ageMax, setAgeMax] = useState<number>()

    const [size, setSize] = useState('')
    const [from, setFrom] = useState('')
    const [dogs, setDogs] = useState<Dog[]>([])

    //api call to get dogs

    return (
        <Container
            sx={{
                flexDirection: 'column',
                flex: 1,
                padding: mobile.mobile ? '20px' : '0px 20px 20px 20px',
                marginTop: '50px',
                justifyContent: 'flex-start',
                alignItems: 'center',
                overflow: 'auto'
            }}
        >
            <Container
                sx={{
                    flexDirection: 'row',
                    flex: 1,
                    width: '1040px'
                }}
            >
                <Container
                    sx={{
                        flexDirection: 'column',
                        flex: 1,
                        maxWidth: '1040px'
                    }}
                >
                    <Typography variant="title">{`Welcome ${user?.name},`}</Typography>
                    <Typography>Let's find you the perfect dog!</Typography>
                    <SearchBar
                        size={size}
                        from={from}
                        breeds={breeds}
                        setBreeds={setBreeds}
                        zipCodes={zipCodes}
                        setZipCodes={setZipCodes}
                        ageMin={ageMin}
                        setAgeMin={setAgeMin}
                        ageMax={ageMax}
                        setAgeMax={setAgeMax}
                        setDogs={setDogs}
                    />
                    <DogGrid dogs={dogs} setFrom={setFrom} setSize={setSize} />
                </Container>
            </Container>
        </Container>
    )
}
