import { FunctionComponent } from 'react'
import { Dog } from '../../../api'
import { Container, Spinner } from '../../layoutComponents'
import { DogCard } from './DogCard'
import { Typography } from '../../layoutComponents/Typography'
import { Autocomplete, Button } from '../../inputComponents'
import { isEqual } from 'lodash'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { colors } from '../../Colors'
import { useDarkTheme } from '../../../providers'

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

    const handleSort = (value: string) => {
        if (value === 'Breed A-Z') {
            props.setSort({ breed: 'asc' })
        } else if (value === 'Breed Z-A') {
            props.setSort({ breed: 'desc' })
        } else if (value === 'Name A-Z') {
            props.setSort({ name: 'asc' })
        } else if (value === 'Name Z-A') {
            props.setSort({ name: 'desc' })
        } else if (value === 'Age Ascending') {
            props.setSort({ age: 'asc' })
        } else {
            props.setSort({ age: 'desc' })
        }

        props.setDirty(true)
    }

    const getValue = () => {
        if (isEqual(props.sort, { breed: 'asc' })) {
            return 'Breed A-Z'
        } else if (isEqual(props.sort, { breed: 'desc' })) {
            return 'Breed Z-A'
        } else if (isEqual(props.sort, { name: 'asc' })) {
            return 'Name A-Z'
        } else if (isEqual(props.sort, { name: 'desc' })) {
            return 'Name Z-A'
        } else if (isEqual(props.sort, { age: 'asc' })) {
            return 'Age Ascending'
        } else {
            return 'Age Descending'
        }
    }
    return (
        <Container
            sx={{
                flexDirection: 'row',
                flex: 1,
                maxWidth: '1150px',
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
                            value={getValue() as string}
                            onChange={handleSort}
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
                            onChange={handleSize}
                            list={['25', '50', '100']}
                            sx={{ width: '30px' }}
                            hideHelper
                        />
                    </Container>
                    <Container
                        sx={{
                            flexDirection: 'row',
                            flex: 1,
                            flexWrap: 'wrap',
                            width: '100%',
                            gap: '30px',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            overflow: 'auto',
                            padding: '10px'
                        }}
                    >
                        {props.dogs.map((dog, index) => (
                            <DogCard key={dog.breed + index} dog={dog} />
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
                            {parseInt(props.from) <= 0 ? (
                                <></>
                            ) : (
                                <Button
                                    onClick={handlePrevious}
                                    sx={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        padding: '0px',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <BiChevronLeft style={{ fontSize: '30px' }} />
                                </Button>
                            )}
                            {parseInt(props.from) + parseInt(props.size) >=
                            parseInt(props.total) ? (
                                <></>
                            ) : (
                                <Button
                                    onClick={handleNext}
                                    sx={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        padding: '0px',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <BiChevronRight style={{ fontSize: '30px' }} />
                                </Button>
                            )}
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
