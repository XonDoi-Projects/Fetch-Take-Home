import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dog, DogLocation, Location, SearchQueryParams } from '../../../api'
import { Container, FadeInOut, FixedDiv } from '../../layoutComponents'
import { Autocomplete, Button, TextField } from '../../inputComponents'
import { colors } from '../../Colors'
import { Typography } from '../../layoutComponents/Typography'
import { useDarkTheme, useSize, useUser } from '../../../providers'
import { FETCH_BASE_URL } from '../../env'
import { BreedFilter } from './BreedFilter'
import { ZipCodeFilter } from './ZipCodeFilter'
import { Sort } from '../dogs/DogGrid'
import { useNavigate } from 'react-router-dom'

export interface SearchBarProps {
    from: string
    setFrom: (value: string) => void
    size: string
    setSize: (value: string) => void

    breeds: string[]
    zipCodes: string[]
    ageMin?: number
    ageMax?: number
    setBreeds: (value: string[]) => void
    setZipCodes: (value: string[]) => void
    setAgeMin: (value?: number) => void
    setAgeMax: (value?: number) => void

    setDogs: (value: DogLocation[]) => void

    setLoading: (value: boolean) => void

    dirty: boolean
    setDirty: (value: boolean) => void

    setTotal: (value: string) => void

    sort: Sort

    handleSize?: (value: string) => void
    handleSort?: (value: string) => void
    getSortValue?: () => string
}

export const SearchBar: FunctionComponent<SearchBarProps> = ({
    dirty,
    setDirty,
    setDogs,
    setTotal,
    setLoading,
    ...props
}) => {
    const { light } = useDarkTheme()
    const mobile = useSize()
    const { setUser } = useUser()
    const navigate = useNavigate()

    const [snackbar, setSnackbar] = useState<{ message: string; color: string }>()
    const [showSnackbar, setShowSnackbar] = useState(false)

    const timeoutRef = useRef<NodeJS.Timeout>()

    const queryParams: SearchQueryParams = useMemo(
        () => ({
            ageMax: props.ageMax?.toString() || '',
            ageMin: props.ageMin?.toString() || '',
            breeds: props.breeds,
            zipCodes: props.zipCodes
        }),
        [props.ageMax, props.ageMin, props.breeds, props.zipCodes]
    )

    const handleClear = () => {
        props.setAgeMax(undefined)
        props.setAgeMin(undefined)
        props.setBreeds([])
        props.setZipCodes([])

        setDirty(true)
    }

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

    const getQueryString = useCallback(() => {
        type SearchKeys = keyof SearchQueryParams

        const searchParams = new URLSearchParams()

        for (const key in queryParams) {
            if (
                Array.isArray(queryParams[key as SearchKeys]) &&
                queryParams[key as SearchKeys].length
            ) {
                for (const value of queryParams[key as SearchKeys]) {
                    searchParams.append(key, value)
                }
            } else if (
                !Array.isArray(queryParams[key as SearchKeys]) &&
                queryParams[key as SearchKeys]
            ) {
                searchParams.set(key, queryParams[key as SearchKeys] as string)
            }
        }

        return searchParams.toString()
    }, [queryParams])

    const pullData = useCallback(async () => {
        if (dirty) {
            setLoading(true)
            try {
                const queryString = getQueryString()

                const result = await fetch(
                    `${FETCH_BASE_URL}/dogs/search?${queryString || ''}&size=${
                        props.size || ''
                    }&from=${props.from || ''}&sort=${Object.keys(props.sort)[0]}:${
                        Object.values(props.sort)[0]
                    }`,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'GET',
                        credentials: 'include'
                    }
                ).then((res) => {
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

                const dogIds = result.resultIds

                const dogs: Dog[] = await fetch(`${FETCH_BASE_URL}/dogs`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dogIds),
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

                const uniqueZipCodes = new Set([...dogs.map((dog) => dog?.zip_code)])

                const locations: Location[] = await fetch(`${FETCH_BASE_URL}/locations`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Array.from(uniqueZipCodes)),
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
                    ...locations?.find((location) => location?.zip_code === dog?.zip_code)
                }))

                setDogs(dogWithLocations)
                setTotal(result.total)
                setDirty(false)
            } catch (e) {
                setSnackbar({ message: 'Request failed!', color: colors.light.error })
                setShowSnackbar(true)
            }
            setLoading(false)
        }
    }, [
        dirty,
        getQueryString,
        navigate,
        props.from,
        props.size,
        props.sort,
        setDirty,
        setDogs,
        setLoading,
        setTotal,
        setUser
    ])

    useEffect(() => {
        pullData()
    }, [pullData])

    return (
        <>
            <Container
                sx={{
                    flex: 1,
                    padding: '20px',
                    flexDirection: 'column',
                    maxWidth: '400px',
                    borderRadius: mobile.mobile ? undefined : '4px',
                    backgroundColor: light ? colors.light.card : colors.dark.card,
                    overflow: 'hidden'
                }}
            >
                <Container
                    sx={{
                        flexDirection: 'column',
                        flex: 1,
                        gap: '20px',
                        borderRadius: mobile.mobile ? undefined : '4px',
                        backgroundColor: light ? colors.light.card : colors.dark.card,
                        overflow: mobile.mobile ? 'auto' : 'hidden',
                        paddingBottom: '20px'
                    }}
                >
                    {mobile.mobile && props.getSortValue ? (
                        <Container
                            sx={{
                                flexDirection: 'row',
                                gap: '10px',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: light ? colors.light.card : colors.dark.card
                            }}
                        >
                            <Autocomplete
                                value={props.getSortValue() as string}
                                onChange={(value) => props.handleSort && props.handleSort(value)}
                                list={[
                                    'Breed A-Z',
                                    'Breed Z-A',
                                    'Age Ascending',
                                    'Age Descending',
                                    'Name A-Z',
                                    'Name Z-A'
                                ]}
                                containerSx={{ flex: 1 }}
                                label="Sort"
                                hideHelper
                            />
                            <Autocomplete
                                value={props.size}
                                onChange={(value) => props.handleSize && props.handleSize(value)}
                                list={['25', '50', '100']}
                                containerSx={{ width: '100px' }}
                                label="Size"
                                hideHelper
                            />
                        </Container>
                    ) : (
                        <></>
                    )}
                    <Container
                        sx={{
                            flexDirection: 'row',
                            gap: '10px',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <TextField
                            value={props.ageMin?.toString() || ''}
                            onChange={(e) => {
                                if (/^[0-9]*$/i.test(e)) {
                                    props.setAgeMin(e ? parseInt(e) : undefined)
                                }
                            }}
                            label="Min Age (Years)"
                            containerSx={{ flex: 1 }}
                            hideHelper
                        />
                        <TextField
                            value={props.ageMax?.toString() || ''}
                            onChange={(e) => {
                                if (/^[0-9]*$/i.test(e)) {
                                    props.setAgeMax(e ? parseInt(e) : undefined)
                                }
                            }}
                            label="Max Age (Years)"
                            containerSx={{ flex: 1 }}
                            hideHelper
                        />
                    </Container>
                    <ZipCodeFilter zipCodes={props.zipCodes} setZipCodes={props.setZipCodes} />
                    <Typography
                        variant="field"
                        sx={{
                            color: light ? colors.dark.background : colors.light.background,
                            marginBottom: '0px',
                            fontWeight: 'bold',
                            letterSpacing: '1.2px'
                        }}
                    >
                        Breed
                    </Typography>
                    <BreedFilter breeds={props.breeds} setBreeds={props.setBreeds} />
                </Container>

                <Container sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button
                        onClick={() => {
                            props.setFrom('0')
                            setDirty(true)
                        }}
                        sx={{
                            borderRadius: '19px',
                            color: light ? colors.light.textOnAccent : colors.dark.textOnAccent,
                            backgroundColor: light ? colors.light.accent : colors.dark.accent,
                            width: '100px'
                        }}
                        swapHover
                    >
                        Apply
                    </Button>
                    <Button
                        onClick={handleClear}
                        sx={{
                            borderRadius: '19px',
                            color: light ? colors.light.textOnAccent : colors.dark.textOnAccent,
                            backgroundColor: light ? colors.light.accent : colors.dark.accent,
                            width: '100px'
                        }}
                        swapHover
                    >
                        Clear
                    </Button>
                </Container>
            </Container>

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
        </>
    )
}
