import { FunctionComponent } from 'react'
import { DogLocation } from '../../../api'
import { Card, Container, Cover, FixedDiv } from '../../layoutComponents'
import { Typography } from '../../layoutComponents/Typography'
import { Button } from '../../inputComponents'
import { BiX } from 'react-icons/bi'
import { keyframes } from '@emotion/react'
import { useSize } from '../../../providers'

export interface FavoriteProps {
    dog: DogLocation
    show: boolean
    setShow: (value: boolean) => void
}

const oscillate = keyframes({
    '0%': {
        transform: 'scale(0) rotate(0deg)'
    },
    '100%': {
        transform: 'scale(1) rotate(1800deg)'
    }
})

export const Favorite: FunctionComponent<FavoriteProps> = (props) => {
    const mobile = useSize()

    return props.show ? (
        <FixedDiv
            sx={{
                width: '100vw',
                height: '100dvh',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                zIndex: 3
            }}
        >
            <Cover show={props.show} dismissable onClose={() => props.setShow(false)} />
            <Card
                sx={{
                    flexDirection: 'column',
                    width: mobile.mobile ? '250px' : '400px',
                    height: '400px',
                    gap: '10px',
                    padding: '5px',
                    alignItems: 'flex-end',
                    animation: `${oscillate} 2s ease`,
                    borderRadius: '10px',
                    zIndex: 4
                }}
            >
                <Button
                    sx={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        padding: '0px',
                        backgroundColor: 'transparent'
                    }}
                    onClick={() => props.setShow(false)}
                >
                    <BiX style={{ fontSize: '24px' }} />
                </Button>
                <Typography
                    sx={{
                        width: '100%',
                        textAlign: 'center'
                    }}
                >
                    You matched with
                </Typography>
                <Typography
                    variant="subtitle"
                    sx={{
                        width: '100%',
                        fontSize: '22px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}
                >
                    {props.dog.name}!
                </Typography>

                <Container
                    sx={{
                        flex: 1,
                        flexDirection: 'column',
                        width: '100%',
                        height: '250px',
                        borderRadius: '10px'
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
                            flex: 1,
                            width: '100%',
                            gap: '5px',
                            padding: '5px',
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <Typography sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
                            {props.dog.breed} · {props.dog.age} YRS
                        </Typography>

                        <Typography
                            variant="small"
                            sx={{ textAlign: 'center', wordBreak: 'break-word', fontSize: '14px' }}
                        >
                            {`${props.dog.city}, ${props.dog.state} · ${props.dog.zip_code}`}
                        </Typography>
                    </Container>
                </Container>
            </Card>
        </FixedDiv>
    ) : (
        <></>
    )
}
