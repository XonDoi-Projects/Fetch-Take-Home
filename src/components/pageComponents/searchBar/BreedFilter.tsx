import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { Container, FadeInOut, FixedDiv, Spinner } from '../../layoutComponents'
import { Checkbox, CheckboxValue } from '../../inputComponents/Checkbox'
import { FETCH_BASE_URL } from '../../env'
import { colors } from '../../Colors'
import { Typography } from '../../layoutComponents/Typography'
import { cloneDeep } from 'lodash'

export interface BreedFilterProps {
    breeds: string[]
    setBreeds: (value: string[]) => void
}

export const BreedFilter: FunctionComponent<BreedFilterProps> = (props) => {
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

    const pullBreeds = useCallback(async () => {
        setLoading(true)
        try {
            const result = await fetch(`${FETCH_BASE_URL}/dogs/breeds`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                credentials: 'include'
            }).then((res) => res.json())

            setAllBreeds(result)
        } catch (e) {
            console.log(e)
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
        <Container sx={{ flexDirection: 'column', height: '500px', overflow: 'auto' }}>
            {loading ? (
                <Spinner swapColor />
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
