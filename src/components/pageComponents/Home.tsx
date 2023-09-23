import { useEffect, useRef, useState } from 'react'
import { useDarkTheme, useSize, useUser } from '../../providers'
import { Container, FadeInOut, FixedDiv, Overlay } from '../layoutComponents'
import { Typography } from '../layoutComponents/Typography'
import { SearchBar } from './searchBar'
import { Dog, DogLocation, Location, Match } from '../../api'
import { DogGrid, Sort } from './dogs/DogGrid'
import { Button } from '../inputComponents'
import { BiFilter, BiSolidHeart, BiX } from 'react-icons/bi'
import { isEqual } from 'lodash'
import { colors } from '../Colors'
import { FETCH_BASE_URL } from '../env'
import { Favorite } from './dogs/Favorite'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const mobile = useSize()
    const { user, setUser } = useUser()
    const { light } = useDarkTheme()
    const navigate = useNavigate()

    const [breeds, setBreeds] = useState<string[]>([])
    const [zipCodes, setZipCodes] = useState<string[]>([])
    const [ageMin, setAgeMin] = useState<number>()
    const [ageMax, setAgeMax] = useState<number>()
    const [favorites, setFavorites] = useState<string[]>([])

    const [favorite, setFavorite] = useState<DogLocation>()

    const [size, setSize] = useState('25')
    const [from, setFrom] = useState('0')
    const [dogs, setDogs] = useState<DogLocation[]>([])
    const [total, setTotal] = useState<string>('')
    const [sort, setSort] = useState<Sort>({ breed: 'asc' })

    const [loading, setLoading] = useState(true)
    const [loadingMatch, setLoadingMatch] = useState(false)

    const [dirty, setDirty] = useState(true)

    const [show, setShow] = useState(false)
    const [showFavorite, setShowFavorite] = useState(false)

    const [snackbar, setSnackbar] = useState<{ message: string; color: string }>()
    const [showSnackbar, setShowSnackbar] = useState(false)

    const timeoutRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        if (timeoutRef.current !== undefined) {
            clearTimeout(timeoutRef.current)
        }

        if (showSnackbar) {
            timeoutRef.current = setTimeout(() => {
                setShowSnackbar(false)
            }, 3000)
        }
    }, [showSnackbar])

    const handleSize = (value: string) => {
        setSize(value)
        setDirty(true)
    }

    const handleSort = (value: string) => {
        if (value === 'Breed A-Z') {
            setSort({ breed: 'asc' })
        } else if (value === 'Breed Z-A') {
            setSort({ breed: 'desc' })
        } else if (value === 'Name A-Z') {
            setSort({ name: 'asc' })
        } else if (value === 'Name Z-A') {
            setSort({ name: 'desc' })
        } else if (value === 'Age Ascending') {
            setSort({ age: 'asc' })
        } else {
            setSort({ age: 'desc' })
        }

        setDirty(true)
    }

    const getSortValue = () => {
        if (isEqual(sort, { breed: 'asc' })) {
            return 'Breed A-Z'
        } else if (isEqual(sort, { breed: 'desc' })) {
            return 'Breed Z-A'
        } else if (isEqual(sort, { name: 'asc' })) {
            return 'Name A-Z'
        } else if (isEqual(sort, { name: 'desc' })) {
            return 'Name Z-A'
        } else if (isEqual(sort, { age: 'asc' })) {
            return 'Age Ascending'
        } else {
            return 'Age Descending'
        }
    }

    const handleMatch = async () => {
        setLoadingMatch(true)
        try {
            const result: Match = await fetch(`${FETCH_BASE_URL}/dogs/match`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(favorites),
                credentials: 'include'
            }).then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else if (res.status === 401) {
                    setUser(undefined)
                    navigate('/login')
                    setSnackbar({
                        message: `${res.status} - Authentication Failure!`,
                        color: colors.light.error
                    })
                    setShowSnackbar(true)
                } else {
                    setSnackbar({
                        message: `${res.status} - Something went wrong!`,
                        color: colors.light.error
                    })
                    setShowSnackbar(true)
                }
            })

            const match = [result.match]

            const dog: Dog[] = await fetch(`${FETCH_BASE_URL}/dogs`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(match),
                method: 'POST',
                credentials: 'include'
            }).then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else if (res.status === 401) {
                    setUser(undefined)
                    navigate('/login')
                    setSnackbar({
                        message: `${res.status} - Authentication Failure!`,
                        color: colors.light.error
                    })
                    setShowSnackbar(true)
                } else {
                    setSnackbar({
                        message: `${res.status} - Something went wrong!`,
                        color: colors.light.error
                    })
                    setShowSnackbar(true)
                }
            })

            const locations: Location[] = await fetch(`${FETCH_BASE_URL}/locations`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dog[0]),
                method: 'POST',
                credentials: 'include'
            }).then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else if (res.status === 401) {
                    setUser(undefined)
                    navigate('/login')
                    setSnackbar({
                        message: `${res.status} - Authentication Failure!`,
                        color: colors.light.error
                    })
                    setShowSnackbar(true)
                } else {
                    setSnackbar({
                        message: `${res.status} - Something went wrong!`,
                        color: colors.light.error
                    })
                    setShowSnackbar(true)
                }
            })

            const dogWithLocations = dogs.map((dog) => ({
                ...dog,
                ...locations.find((location) => location.zip_code === dog.zip_code)
            }))

            setFavorite(dogWithLocations[0])
            setShowFavorite(true)
        } catch (e) {
            setSnackbar({ message: 'Request failed!', color: colors.light.error })
            setShowSnackbar(true)
        }

        setLoadingMatch(false)
    }

    return (
        <Container
            sx={{
                flexDirection: 'column',
                flex: 1,
                padding: '20px',
                justifyContent: 'flex-start',
                alignItems: 'center',
                overflow: 'hidden',
                width: '100%'
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
                    <>
                        <Overlay
                            show={show}
                            openDirection="left"
                            onClose={() => setShow(false)}
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                backgroundColor: light ? colors.light.card : colors.dark.card
                            }}
                        >
                            <Button
                                sx={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    padding: '0px',
                                    backgroundColor: 'transparent'
                                }}
                                onClick={() => setShow(false)}
                            >
                                <BiX style={{ fontSize: '20px' }} />
                            </Button>
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
                                handleSort={handleSort}
                                getSortValue={getSortValue}
                            />
                        </Overlay>
                    </>
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
                <Container
                    sx={{
                        flexDirection: 'column',
                        flex: 1,
                        flexWrap: 'wrap',
                        alignContent: mobile.mobile ? 'space-between' : 'flex-start'
                    }}
                >
                    <Typography
                        variant="title"
                        sx={{ textAlign: 'left' }}
                    >{`Hi ${user?.name},`}</Typography>
                    <Typography sx={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
                        Let's find you the perfect dog!
                    </Typography>

                    <Container
                        sx={{
                            flexDirection: 'row',
                            marginBottom: '20px',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        {mobile.mobile ? (
                            <Button
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    padding: '0px',
                                    backgroundColor: 'transparent'
                                }}
                                onClick={() => setShow(true)}
                            >
                                <BiFilter style={{ fontSize: '30px' }} />
                            </Button>
                        ) : (
                            <></>
                        )}
                        <Container
                            sx={{
                                flexDirection: 'row',
                                width: 'fit-content',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                        >
                            <BiSolidHeart
                                style={{
                                    fontStyle: '15px',
                                    color: light ? colors.light.heart : colors.dark.heart
                                }}
                            />
                            <Typography
                                variant={mobile.mobile ? 'small' : 'body'}
                            >{`${favorites.length}`}</Typography>
                            <Button
                                onClick={() => setFavorites([])}
                                sx={{
                                    height: '20px',
                                    borderRadius: '19px',
                                    backgroundColor: light
                                        ? colors.light.background
                                        : colors.dark.background
                                }}
                                loading={loadingMatch}
                            >
                                <Typography
                                    variant="small"
                                    sx={{
                                        color: light ? colors.light.accent : colors.dark.accent,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Clear
                                </Typography>
                            </Button>
                        </Container>

                        <Button
                            onClick={handleMatch}
                            sx={{
                                borderRadius: '19px',
                                color: light ? colors.light.textOnAccent : colors.dark.textOnAccent,
                                backgroundColor: light ? colors.light.accent : colors.dark.accent,
                                width: '150px'
                            }}
                            loading={loadingMatch}
                            swapHover
                        >
                            Find Match!
                        </Button>
                    </Container>
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
                        handleSort={handleSort}
                        getSortValue={getSortValue}
                        handleSize={handleSize}
                        favorites={favorites}
                        setFavorites={setFavorites}
                    />
                </Container>
            </Container>

            {favorite ? (
                <Favorite dog={favorite} setShow={setShowFavorite} show={showFavorite} />
            ) : (
                <></>
            )}
            <FadeInOut show={showSnackbar} sx={{ zIndex: 3 }}>
                <FixedDiv
                    sx={{
                        bottom: '50px',
                        left: '50%',
                        transform: 'translate(-50%,0)',
                        height: '70px',
                        maxWidth: '400px',
                        padding: '0px 20px',
                        overflow: 'hidden',
                        backgroundColor: snackbar?.color,
                        borderRadius: '35px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 3
                    }}
                >
                    <Typography
                        sx={{
                            color: colors.light.background,
                            fontSize: '16px',
                            textAlign: 'center',
                            margin: 0
                        }}
                    >
                        {snackbar?.message}
                    </Typography>
                </FixedDiv>
            </FadeInOut>
        </Container>
    )
}
