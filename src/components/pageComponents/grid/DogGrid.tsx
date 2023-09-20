import { FunctionComponent } from 'react'
import { Dog } from '../../../api'
import { Container, Spinner } from '../../layoutComponents'
import { DogCard } from './DogCard'
import { Typography } from '../../layoutComponents/Typography'
import { Button, RadioButtonGroup } from '../../inputComponents'
import { colors } from '../../Colors'
import { useDarkTheme } from '../../../providers'

export interface DogGridProps {
    total: string
    dogs: Dog[]
    size: string
    setSize: (value: string) => void
    from: string
    setFrom: (value: string) => void

    loading: boolean

    setDirty: (value: boolean) => void
}

export const DogGrid: FunctionComponent<DogGridProps> = (props) => {
    const { light } = useDarkTheme()
    const handleSize = (value: string) => {
        props.setSize(value)
        props.setDirty(true)
    }

    const handleNext = () => {
        const newFrom = parseInt(props.from) + parseInt(props.size)
        props.setFrom(newFrom.toString())
        props.setDirty(true)
    }

    const handlePrevious = () => {
        const newFrom = parseInt(props.from) - parseInt(props.size)
        props.setFrom(newFrom.toString())
        props.setDirty(true)
    }

    console.log(props.from, props.size, props.total)

    return (
        <Container
            sx={{
                flexDirection: 'row',
                flex: 1,
                maxWidth: '1090px',
                overflow: 'hidden'
            }}
        >
            {props.loading ? (
                <Container
                    sx={{
                        flexDirection: 'row',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Spinner swapColor />
                </Container>
            ) : props.dogs.length ? (
                <Container
                    sx={{
                        flexDirection: 'column',
                        gap: '20px',
                        flex: 1,
                        overflow: 'hidden',
                        alignItems: 'flex-end'
                    }}
                >
                    <RadioButtonGroup
                        buttonList={['25', '50', '100']}
                        direction="right"
                        value={props.size}
                        onChange={handleSize}
                    />
                    <Container
                        sx={{
                            flexDirection: 'row',
                            flex: 1,
                            flexWrap: 'wrap',
                            width: '100%',
                            gap: '20px',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            overflow: 'auto'
                        }}
                    >
                        {props.dogs.map((dog, index) => (
                            <DogCard key={dog.breed + index} dog={dog} />
                        ))}
                    </Container>
                    <Container sx={{ flexDirection: 'row', gap: '10px' }}>
                        {parseInt(props.from) <= 0 ? (
                            <></>
                        ) : (
                            <Button
                                onClick={handlePrevious}
                                sx={{
                                    borderRadius: '19px',
                                    color: light
                                        ? colors.light.accentForeground
                                        : colors.dark.accentForeground,
                                    backgroundColor: light
                                        ? colors.light.accent
                                        : colors.dark.accent,
                                    width: '100px'
                                }}
                                swapHover
                            >
                                Previous
                            </Button>
                        )}
                        {parseInt(props.from) + parseInt(props.size) >= parseInt(props.total) ? (
                            <></>
                        ) : (
                            <Button
                                onClick={handleNext}
                                sx={{
                                    borderRadius: '19px',
                                    color: light
                                        ? colors.light.accentForeground
                                        : colors.dark.accentForeground,
                                    backgroundColor: light
                                        ? colors.light.accent
                                        : colors.dark.accent,
                                    width: '100px'
                                }}
                                swapHover
                            >
                                Next
                            </Button>
                        )}
                    </Container>
                </Container>
            ) : (
                <Container
                    sx={{
                        flexDirection: 'row',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography>We found no dogs that match your search criteria!</Typography>
                </Container>
            )}
        </Container>
    )
}
