import { FunctionComponent } from 'react'
import { Dog } from '../../../api'
import { Container } from '../../layoutComponents'
import { useDarkTheme } from '../../../providers'
import { colors } from '../../Colors'
import { Typography } from '../../layoutComponents/Typography'

export interface DogCardProps {
    dog: Dog
}

export const DogCard: FunctionComponent<DogCardProps> = (props) => {
    const { light } = useDarkTheme()

    console.log(props.dog)
    return (
        <Container
            sx={{
                // flex: 1,
                flexDirection: 'column',
                width: '200px',
                height: '300px',
                borderRadius: '4px',
                backgroundColor: light ? colors.dark.background : colors.light.background
            }}
        >
            <Container sx={{ height: '200px', justifyContent: 'center' }}>
                <img
                    src={`${props.dog.img}`}
                    alt={`${props.dog.name} ${props.dog.breed} ${props.dog.age}`}
                    style={{
                        objectFit: 'contain',
                        width: '190px',
                        height: '200px'
                    }}
                />
            </Container>
            <Container
                sx={{
                    flexDirection: 'column',
                    height: '90px',
                    width: '100%',
                    gap: '5px',
                    padding: '5px',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant="body"
                    sx={{ color: light ? colors.dark.foreground : colors.light.foreground }}
                >
                    Name: {props.dog.name}
                </Typography>
                <Typography
                    variant="body"
                    sx={{ color: light ? colors.dark.foreground : colors.light.foreground }}
                >
                    Breed: {props.dog.breed}
                </Typography>
                <Container sx={{ flexDirection: 'row', gap: '20px', paddingTop: '10px' }}>
                    <Typography
                        variant="small"
                        sx={{ color: light ? colors.dark.foreground : colors.light.foreground }}
                    >
                        Age: {props.dog.age}
                    </Typography>
                    <Typography
                        variant="small"
                        sx={{ color: light ? colors.dark.foreground : colors.light.foreground }}
                    >
                        Zip Code: {props.dog.zip_code}
                    </Typography>
                </Container>
            </Container>
        </Container>
    )
}
