import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'
import { Dog } from '../../../api'
import { Container, Spinner } from '../../layoutComponents'
import { DogCard } from './DogCard'
import { Typography } from '../../layoutComponents/Typography'
import { Autocomplete, Button } from '../../inputComponents'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { colors } from '../../Colors'
import { useDarkTheme, useSize } from '../../../providers'

export interface Sort {
    [field: string]: 'asc' | 'desc'
}

export interface DogGridProps {
    total: string
    dogs: Dog[]
    size: string
    setSize: (value: string) => void
    from: string
    setFrom: (value: string) => void
    sort: Sort
    setSort: (value: Sort) => void

    loading: boolean

    setDirty: (value: boolean) => void

    handleSize?: (value: string) => void
    handleSort?: (value: string) => void
    getSortValue?: () => string

    favorites: string[]
    setFavorites: (value: string[]) => void
}

export const DogGrid: FunctionComponent<DogGridProps> = (props) => {
    const { light } = useDarkTheme()
    const mobile = useSize()

    const ref = useRef<HTMLDivElement>(null)

    const [dogGridDOMwidth, setDogGridDOMWidth] = useState<number>()

    useEffect(() => {
        if (ref.current) {
            setDogGridDOMWidth(ref.current.getBoundingClientRect().width)
        }
    }, [mobile.size])

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

    const cardsToFit = useMemo(() => {
        if (dogGridDOMwidth) {
            const n = Math.floor(1 + (dogGridDOMwidth - 240) / 225)

            return n > 5 ? 5 : n
        }
        return 5
    }, [dogGridDOMwidth])

    return (
        <Container
            ref={ref}
            sx={{
                flexDirection: 'row',
                flex: 1,
                maxWidth: '100%',
                overflow: 'hidden'
            }}
        >
            {props.loading ? (
                <Container
                    sx={{
                        flexDirection: 'row',
                        flex: 1,
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
                    {!mobile.mobile && props.getSortValue ? (
                        <Container
                            sx={{
                                flexDirection: 'row',
                                padding: '20px',
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: light ? colors.light.card : colors.dark.card,
                                borderRadius: '4px'
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
                                sx={{ width: '120px' }}
                                hideHelper
                            />
                            <Autocomplete
                                value={props.size}
                                onChange={(value) => props.handleSize && props.handleSize(value)}
                                list={['25', '50', '100']}
                                sx={{ width: '30px' }}
                                hideHelper
                            />
                        </Container>
                    ) : (
                        <></>
                    )}
                    <Container
                        sx={{
                            flexDirection: 'row',
                            flex: 1,
                            flexWrap: 'wrap',
                            width: '100%',
                            columnGap: '25px',
                            rowGap: '25px',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            overflow: 'auto',
                            padding: '15px'
                        }}
                    >
                        {props.dogs.map((dog, index) => (
                            <DogCard
                                key={dog.breed + index}
                                dog={dog}
                                favorites={props.favorites}
                                setFavorites={props.setFavorites}
                                width={
                                    ((dogGridDOMwidth || 0) - (cardsToFit * 25 + 40)) / cardsToFit >
                                    200
                                        ? ((dogGridDOMwidth || 0) - (cardsToFit * 25 + 40)) /
                                          cardsToFit
                                        : 200
                                }
                            />
                        ))}
                    </Container>
                    <Container
                        sx={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '5px',
                            backgroundColor: light ? colors.light.card : colors.dark.card,
                            borderRadius: '4px'
                        }}
                    >
                        <Typography variant="small" sx={{ marginLeft: '5px' }}>{`${props.from} - ${
                            parseInt(props.from) + parseInt(props.size)
                        } of ${props.total} results`}</Typography>
                        <Container sx={{ flexDirection: 'row', gap: '10px' }}>
                            <Button
                                onClick={handlePrevious}
                                sx={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    padding: '0px',
                                    backgroundColor: 'transparent',
                                    opacity: parseInt(props.from) <= 0 ? '0.5' : '1'
                                }}
                                disabled={parseInt(props.from) <= 0}
                            >
                                <BiChevronLeft style={{ fontSize: '30px' }} />
                            </Button>

                            <Button
                                onClick={handleNext}
                                sx={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    padding: '0px',
                                    backgroundColor: 'transparent',
                                    opacity:
                                        parseInt(props.from) + parseInt(props.size) >=
                                        parseInt(props.total)
                                            ? '0.5'
                                            : '1'
                                }}
                                disabled={
                                    parseInt(props.from) + parseInt(props.size) >=
                                    parseInt(props.total)
                                }
                            >
                                <BiChevronRight style={{ fontSize: '30px' }} />
                            </Button>
                        </Container>
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
