import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { Container, FadeInOut, FixedDiv, Spinner } from '../../layoutComponents'
import { Checkbox, CheckboxValue } from '../../inputComponents/Checkbox'
import { FETCH_BASE_URL } from '../../env'
import { colors } from '../../Colors'
import { Typography } from '../../layoutComponents/Typography'
import { cloneDeep } from 'lodash'
import { useSize } from '../../../providers'

export interface BreedFilterProps {
    breeds: string[]
    setBreeds: (value: string[]) => void
}

export const BreedFilter: FunctionComponent<BreedFilterProps> = (props) => {
    const mobile = useSize()
    const [allBreeds, setAllBreeds] = useState<string[]>([])

    const [loading, setLoading] = useState(false)

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

    const pullBreeds = useCallback(() => {
        setLoading(true)
        try {
            fetch(`${FETCH_BASE_URL}/dogs/breeds`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                credentials: 'include'
            })
                .then((res) => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        setSnackbar({
                            message: `${res.status} - Something went wrong!`,
                            color: colors.light.error
                        })
                        setShowSnackbar(true)
                    }
                })
                .then((data) => setAllBreeds(data))
        } catch (e) {
            setSnackbar({ message: 'Could not get breeds!', color: colors.light.error })
            setShowSnackbar(true)
        }
        setLoading(false)
    }, [setLoading])

    useEffect(() => {
        pullBreeds()
    }, [pullBreeds])

    const handleBreed = (value: CheckboxValue, breed: string) => {
        const tempBreeds = cloneDeep(props.breeds)

        if (value === 'yes') {
            tempBreeds.push(breed)
        } else if (value === 'no') {
            const match = tempBreeds.findIndex((b) => b === breed)

            if (match >= 0) {
                tempBreeds.splice(match, 1)
            }
        }

        props.setBreeds(tempBreeds)
    }

    return (
        <Container sx={{ flexDirection: 'column', flex: 1, overflow: 'auto' }}>
            <Container
                sx={{
                    flexDirection: 'column',
                    flex: 1,
                    overflow: mobile.mobile ? undefined : 'auto'
                }}
            >
                {loading ? (
                    <Container sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner swapColor />
                    </Container>
                ) : (
                    allBreeds.map((breed, index) => (
                        <Checkbox
                            key={breed + index}
                            value={props.breeds.includes(breed) ? 'yes' : 'no'}
                            onChange={(e) => handleBreed(e, breed)}
                            label={breed}
                        />
                    ))
                )}
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
        </Container>
    )
}
