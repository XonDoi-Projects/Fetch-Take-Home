import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dog, SearchQueryParams } from '../../../api'
import { Container, FadeInOut, FixedDiv } from '../../layoutComponents'
import { TextField } from '../../inputComponents'
import { colors } from '../../Colors'
import { Typography } from '../../layoutComponents/Typography'
import { useSize } from '../../../providers'
import { FETCH_BASE_URL } from '../../env'

export interface SearchBarProps {
    from: string
    size: string

    breeds: string[]
    zipCodes: string[]
    ageMin?: number
    ageMax?: number
    setBreeds: (value: string[]) => void
    setZipCodes: (value: string[]) => void
    setAgeMin: (value: number) => void
    setAgeMax: (value: number) => void

    setDogs: (value: Dog[]) => void
}

export const SearchBar: FunctionComponent<SearchBarProps> = ({ setDogs, ...props }) => {
    const mobile = useSize()

    const [snackbar, setSnackbar] = useState<{ message: string; color: string }>()
    const [showSnackbar, setShowSnackbar] = useState(false)

    const timeoutRef = useRef<NodeJS.Timeout>()
    const searchRef = useRef<NodeJS.Timeout>()

    const [searchInput, setSearchInput] = useState('')
    const [searchDebounce, setSearchDebounce] = useState('')

    const queryParams: SearchQueryParams = useMemo(
        () => ({
            ageMax: props.ageMax?.toString() || '',
            ageMin: props.ageMin?.toString() || '',
            breeds: props.breeds.join(','),
            zipCodes: props.zipCodes.join(',')
        }),
        [props.ageMax, props.ageMin, props.breeds, props.zipCodes]
    )

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

    useEffect(() => {
        if (searchRef.current !== undefined) {
            clearTimeout(searchRef.current)
        }

        if (searchInput) {
            searchRef.current = setTimeout(() => {
                setSearchDebounce(searchInput)
            }, 500)
        }
    }, [searchInput])

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
        const keys = Object.keys(queryParams)

        type SearchKeys = keyof SearchQueryParams

        const filteredKeys = keys.filter((key) => queryParams[key as SearchKeys])

        return filteredKeys
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(
                        queryParams[key as SearchKeys]
                    )}`
            )
            .join('&')
    }, [queryParams])

    const pullData = useCallback(async () => {
        try {
            const queryString = getQueryString()
            const result = await fetch(
                `${FETCH_BASE_URL}/dogs/search?${queryString || ''}&size=${props.size || ''}&from=${
                    props.from || ''
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

            const dogs: Dog[] = await fetch(`${FETCH_BASE_URL}/dogs`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dogIds),
                method: 'POST',
                credentials: 'include'
            }).then((res) => res.json())

            setDogs(dogs)
        } catch (e) {
            console.log(e)
            setSnackbar({ message: 'Could not get breeds!', color: colors.light.error })
            setShowSnackbar(true)
        }
    }, [getQueryString, props.from, props.size, setDogs])

    useEffect(() => {
        pullData()
    }, [pullData])

    return (
        <>
            <Container
                sx={{ padding: '20px 0px', flexDirection: 'column', flexWrap: 'wrap', gap: '10px' }}
            >
                <TextField value={searchInput} onChange={setSearchInput} label="Breed" />
                <Container sx={{ gap: '10px' }}>
                    <TextField
                        value={props.ageMin?.toString() || ''}
                        onChange={(e) => props.setAgeMin(parseInt(e))}
                        label="Min Age"
                    />
                    <TextField
                        value={props.ageMax?.toString() || ''}
                        onChange={(e) => props.setAgeMax(parseInt(e))}
                        label="Max Age"
                    />
                </Container>
                {/* //Zipcode builder */}
            </Container>

            <FadeInOut show={showSnackbar}>
                <FixedDiv
                    sx={{
                        bottom: '50px',
                        left: '50%',
                        transform: 'translate(-50%,0)',
                        height: '70px',
                        maxWidth: mobile.mobile ? mobile.size?.width + 'px' : '400px',
                        padding: '0px 20px',
                        overflow: 'hidden',
                        backgroundColor: snackbar?.color,
                        borderRadius: '35px',
                        justifyContent: 'center',
                        alignItems: 'center'
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
