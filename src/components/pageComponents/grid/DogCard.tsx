import { FunctionComponent } from 'react'
import { Dog } from '../../../api'
import { Container } from '../../layoutComponents'
import { useDarkTheme, useSize } from '../../../providers'
import { colors } from '../../Colors'
import { Typography } from '../../layoutComponents/Typography'

export interface DogCardProps {
    dog: Dog
}

export const DogCard: FunctionComponent<DogCardProps> = (props) => {
    const { light } = useDarkTheme()
    const mobile = useSize()

    return (
        <Container
            sx={{
                flex: mobile.mobile ? 1 : undefined,
                flexDirection: 'column',
                width: '200px',
                height: '300px',
                borderRadius: '4px',
                border: '1px solid',
                borderColor: light ? colors.dark.background : colors.light.background
            }}
        >
            <Container
                sx={{
                    height: '200px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <img
                    src={`${props.dog.img}`}
                    alt={`${props.dog.name} ${props.dog.breed} ${props.dog.age}`}
                    style={{
                        objectFit: 'contain',
                        width: '190px',
                        height: '190px',
                        borderRadius: '8px',
                        overflow: 'hidden'
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
                    // sx={{ color: light ? colors.dark.foreground : colors.light.foreground }}
                >
                    Name: {props.dog.name}
                </Typography>
                <Typography
                    variant="small"
                    // sx={{ color: light ? colors.dark.foreground : colors.light.foreground }}
                >
                    Breed: {props.dog.breed}
                </Typography>
                <Container sx={{ flexDirection: 'row', gap: '20px' }}>
                    <Typography
                        variant="small"
                        // sx={{ color: light ? colors.dark.foreground : colors.light.foreground }}
                    >
                        Age: {props.dog.age}
                    </Typography>
                    <Typography
                        variant="small"
                        // sx={{ color: light ? colors.dark.foreground : colors.light.foreground }}
                    >
                        Zip Code: {props.dog.zip_code}
                    </Typography>
                </Container>
            </Container>
        </Container>
    )
}
