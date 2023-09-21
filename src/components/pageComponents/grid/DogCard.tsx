import { FunctionComponent, useState } from 'react'
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

    const [hover, setHover] = useState(false)

    return (
        <Container
            sx={{
                flex: mobile.mobile ? 1 : undefined,
                flexDirection: 'column',
                width: '200px',
                height: '330px',
                borderRadius: '10px',
                backgroundColor: light ? colors.light.card : colors.dark.card,
                boxShadow: `0 0px ${hover ? '15px' : '10px'} ${
                    light ? colors.light.shadow : colors.dark.shadow
                }`,
                overflow: 'visible'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
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
                    height: '120px',
                    width: '100%',
                    gap: '5px',
                    padding: '5px',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant="body"
                    sx={{
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        fontWeight: 'bolder',
                        color: light ? colors.light.textOnAccent : colors.dark.textOnAccent,
                        backgroundColor: light ? colors.light.accent : colors.dark.accent,
                        // borderRadius: '8px',
                        padding: '5px 0px',
                        fontSize: '19px'
                    }}
                >
                    {props.dog.name}
                </Typography>
                <Typography sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
                    {props.dog.breed} · {props.dog.age} YRS
                </Typography>

                <Typography variant="small" sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
                    Zip Code: {props.dog.zip_code}
                </Typography>
            </Container>
        </Container>
    )
}
