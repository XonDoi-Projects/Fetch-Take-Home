import { CSSProperties, FunctionComponent } from 'react'
import { Container } from './Container'
import { colors } from '../Colors'
import { Link } from 'react-router-dom'
import { useSize, useDarkTheme } from '../../providers'
import { Button } from '../inputComponents'

export interface FooterProps {
    sx?: CSSProperties
}

export const Footer: FunctionComponent<FooterProps> = (props) => {
    const { mobile } = useSize()
    const { light } = useDarkTheme()

    return (
        <Container
            sx={{
                flexDirection: 'row',
                width: '100%',
                height: '50px',
                position: mobile ? 'relative' : 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 1,
                padding: '0px 5px',
                borderBottomRightRadius: '0px',
                borderBottomLeftRadius: '0px',
                justifyContent: 'space-between',
                alignItems: 'center',
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
                    maxWidth: 'fit-content',
                    backgroundColor: !mobile
                        ? 'transparent'
                        : light
                        ? colors.light.background
                        : colors.dark.background
                }}
            >
                <Link to="https://github.com/XonDoi-Projects" target="_blank">
                    <Button
                        sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'transparent',
                            padding: '0px'
                        }}
                    >
                        {/* <Image
                            src={
                                !mobile
                                    ? router.pathname === '/' ||
                                      (router.pathname !== '/contact' &&
                                          router.pathname !== '/projects' &&
                                          router.pathname !== '/about')
                                        ? light
                                            ? 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/GitLogo.svg?alt=media&token=ad62ea12-9e45-4d88-b113-d572a871e7b7'
                                            : 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/GitLogoDark.png?alt=media&token=0a9c4264-9db5-42cb-bd53-8cb23e50bfdc'
                                        : !light
                                        ? 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/GitLogo.svg?alt=media&token=ad62ea12-9e45-4d88-b113-d572a871e7b7'
                                        : 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/GitLogoDark.png?alt=media&token=0a9c4264-9db5-42cb-bd53-8cb23e50bfdc'
                                    : light
                                    ? 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/GitLogo.svg?alt=media&token=ad62ea12-9e45-4d88-b113-d572a871e7b7'
                                    : 'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/GitLogoDark.png?alt=media&token=0a9c4264-9db5-42cb-bd53-8cb23e50bfdc'
                            }
                            alt="Git Logo"
                            width={40}
                            height={40}
                            style={{ objectFit: 'scale-down' }}
                        /> */}
                    </Button>
                </Link>
                <Link to="https://www.linkedin.com/in/nathanmagro/" target="_blank">
                    <Button
                        sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'transparent',
                            padding: '0px'
                        }}
                    >
                        {/* <Image
                            src={
                                'https://firebasestorage.googleapis.com/v0/b/portfolio-3b624.appspot.com/o/InLogo.svg?alt=media&token=2635f823-a98b-4193-ab6f-2395d4d40e8f'
                            }
                            alt="LinkedIn Logo"
                            width={35}
                            height={35}
                            style={{ objectFit: 'scale-down' }}
                        /> */}
                    </Button>
                </Link>
            </Container>
        </Container>
    )
}
