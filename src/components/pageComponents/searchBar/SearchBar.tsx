import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dog, SearchQueryParams } from '../../../api'
import { Container, FadeInOut, FixedDiv } from '../../layoutComponents'
import { Button, TextField } from '../../inputComponents'
import { colors } from '../../Colors'
import { Typography } from '../../layoutComponents/Typography'
import { useDarkTheme } from '../../../providers'
import { FETCH_BASE_URL } from '../../env'
import { BreedFilter } from './BreedFilter'
import { ZipCodeFilter } from './ZipCodeFilter'
import { Sort } from '../grid/DogGrid'

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

    setDogs: (value: Dog[]) => void

    setLoading: (value: boolean) => void

    dirty: boolean
    setDirty: (value: boolean) => void

    setTotal: (value: string) => void

    sort: Sort
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
                ).then((res) => res.json())

                const dogIds = result.resultIds

                // if (dogIds.length) {
                const dogs: Dog[] = await fetch(`${FETCH_BASE_URL}/dogs`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dogIds),
                    method: 'POST',
                    credentials: 'include'
                }).then((res) => res.json())

                setDogs(dogs)
                setTotal(result.total)
                // }
                setDirty(false)
            } catch (e) {
                console.log(e)
                setSnackbar({ message: 'Could not get dogs!', color: colors.light.error })
                setShowSnackbar(true)
            }
            setLoading(false)
        }
    }, [
        dirty,
        getQueryString,
        props.from,
        props.size,
        props.sort,
        setDirty,
        setDogs,
        setLoading,
        setTotal
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
                    flexWrap: 'wrap',
                    gap: '20px',
                    maxWidth: '400px',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: light ? colors.light.accent : colors.dark.accent
                }}
            >
                <Container
                    sx={{
                        flexDirection: 'row',
                        gap: '10px',
                        flexWrap: 'wrap',
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
                        sx={{ width: '150px' }}
                    />
                    <TextField
                        value={props.ageMax?.toString() || ''}
                        onChange={(e) => {
                            if (/^[0-9]*$/i.test(e)) {
                                props.setAgeMax(e ? parseInt(e) : undefined)
                            }
                        }}
                        label="Max Age (Years)"
                        sx={{ width: '150px' }}
                    />
                </Container>
                <ZipCodeFilter zipCodes={props.zipCodes} setZipCodes={props.setZipCodes} />
                <BreedFilter breeds={props.breeds} setBreeds={props.setBreeds} />
                <Container sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button
                        onClick={() => setDirty(true)}
                        sx={{
                            borderRadius: '19px',
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
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
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground,
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
