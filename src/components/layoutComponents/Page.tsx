import { CSSProperties, FunctionComponent, ReactNode } from 'react'
import { Container } from './Container'
import { Header } from './Header'
import { Footer } from './Footer'
import { Spinner } from './Spinner'
import { Typography } from './Typography'
import { useDarkTheme, useSize } from '../../providers'
import { colors } from '../Colors'

export interface PageProps {
    sx?: CSSProperties
    children: ReactNode
}

export const Page: FunctionComponent<PageProps> = (props) => {
    const { light } = useDarkTheme()
    const mobile = useSize()

    return light === undefined && !mobile.size ? (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Spinner />
            <Typography sx={{ color: '#252525' }}>Setting up your Theme</Typography>
        </div>
    ) : (
        <Container
            sx={{
                flex: 1,
                flexDirection: 'column',
                width: '100vw',
                maxWidth: '100vw',
                height: mobile.mobile ? '100dvh' : '100vh',
                maxHeight: mobile.mobile ? '100dvh' : '100vh',
                overflowY: mobile.mobile ? 'auto' : 'hidden',
                overflowX: 'hidden',
                backgroundColor: light ? colors.light.background : colors.dark.background,
                ...props.sx
            }}
            hidescrollBar
        >
            <Header />
            {props.children}
            <Footer />
        </Container>
    )
}
