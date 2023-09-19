import { FunctionComponent } from 'react'
import { Dog } from '../../../api'
import { Container } from '../../layoutComponents'
import { DogCard } from './DogCard'

export interface DogGridProps {
    dogs: Dog[]
    setSize: (value: string) => void
    setFrom: (value: string) => void
}

export const DogGrid: FunctionComponent<DogGridProps> = (props) => {
    return (
        <Container
            sx={{
                flex: 1,
                flexWrap: 'wrap',
                gap: '10px'
            }}
        >
            {props.dogs.map((dog) => (
                <DogCard key={dog.breed} dog={dog} />
            ))}
        </Container>
    )
}
