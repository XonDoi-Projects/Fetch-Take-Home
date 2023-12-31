import { CSSProperties, FunctionComponent, useEffect, useRef, useState } from 'react'
import { Container } from './Container'
import { BiMenu, BiAdjust } from 'react-icons/bi'
import { colors } from '../Colors'
import { Link } from 'react-router-dom'
import { useSize, useDarkTheme, useUser } from '../../providers'
import { Button } from '../inputComponents'
import { Typography } from './Typography'
import { useClickOutside } from '../hooks'
import { Popup } from './Popup'
import { Cover } from './Cover'

export interface HeaderProps {
    sx?: CSSProperties
}

const nav = [{ name: 'Logout', link: '/logout' }]

export const Header: FunctionComponent<HeaderProps> = (props) => {
    const { mobile, size } = useSize()
    const { user } = useUser()
    const { light, setLight } = useDarkTheme()

    const [show, setShow] = useState(false)

    const ref = useRef<HTMLDivElement | null>(null)
    const popupRef = useRef<HTMLDivElement | null>(null)

    const [navDOMRect, setNavDOMRect] = useState<DOMRect>()

    useEffect(() => {
        if (ref.current) {
            setNavDOMRect(ref.current.getBoundingClientRect())
        }
    }, [mobile])

    useClickOutside(popupRef, () => setShow(false))

    return (
        <Container
            ref={ref}
            sx={{
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                height: '50px',
                maxHeight: '50px',
                position: 'sticky',
                top: 0,
                left: 0,
                zIndex: 2,
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                backgroundColor: !mobile
                    ? 'transparent'
                    : light
                    ? colors.light.background
                    : colors.dark.background,
                ...props.sx
            }}
        >
            <Container
                sx={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Container
                    sx={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            padding: '0px',
                            backgroundColor: 'transparent'
                        }}
                        onClick={() => setLight(!light)}
                    >
                        <BiAdjust style={{ fontSize: '30px' }} />
                    </Button>
                    <Container sx={{ width: '10px' }} />
                    {user && !mobile ? (
                        nav.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                style={{ textDecoration: 'none', marginRight: '20px' }}
                            >
                                <Typography
                                    variant="linker"
                                    sx={{
                                        fontWeight: 600
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            </Link>
                        ))
                    ) : user ? (
                        <>
                            <Button
                                sx={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    padding: '0px',
                                    backgroundColor: 'transparent'
                                }}
                                onClick={() => setShow(!show)}
                            >
                                <BiMenu style={{ fontSize: '30px' }} />
                            </Button>
                            <Cover show={show} />
                            <Popup
                                popupRef={popupRef}
                                show={show}
                                sx={{ width: size?.width, top: navDOMRect?.height, left: 0 }}
                            >
                                {nav.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.link}
                                        style={{
                                            display: 'flex',
                                            textDecoration: 'none',
                                            marginLeft: '20px',
                                            height: '50px',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography variant="linker" sx={{ fontWeight: 600 }}>
                                            {item.name}
                                        </Typography>
                                    </Link>
                                ))}
                            </Popup>
                        </>
                    ) : (
                        <></>
                    )}
                </Container>
            </Container>
        </Container>
    )
}
