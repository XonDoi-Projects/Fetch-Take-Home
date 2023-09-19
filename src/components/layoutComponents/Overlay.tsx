import { CSSProperties, FunctionComponent, ReactNode } from 'react'
import { Container } from './Container'
import { Cover } from './Cover'
import { colors } from '../Colors'
import { useSize, useDarkTheme } from '../../providers'

export interface OverlayProps {
    show: boolean
    openDirection: 'left' | 'right' | 'top' | 'bottom'
    children: ReactNode
    cover?: boolean
    onClose?: () => void
    sx?: CSSProperties
}

export const Overlay: FunctionComponent<OverlayProps> = (props) => {
    const mobile = useSize()
    const { light } = useDarkTheme()

    const renderOverlay = () => {
        return (
            <Container
                sx={{
                    position: 'fixed',
                    top: props.openDirection !== 'bottom' ? 0 : undefined,
                    bottom: props.openDirection !== 'top' ? 0 : undefined,
                    right: props.openDirection !== 'left' ? 0 : undefined,
                    left: props.openDirection !== 'right' ? 0 : undefined,

                    height:
                        !props.show &&
                        (props.openDirection === 'top' || props.openDirection === 'bottom')
                            ? 0
                            : mobile.mobile
                            ? '100dvh'
                            : props.openDirection === 'right' || props.openDirection === 'left'
                            ? '100vh'
                            : '400px',
                    width:
                        !props.show &&
                        (props.openDirection === 'right' || props.openDirection === 'left')
                            ? 0
                            : mobile.mobile
                            ? '100vw'
                            : props.openDirection === 'top' || props.openDirection === 'bottom'
                            ? '100vw'
                            : '400px',
                    transition: 'all 0.3s ease',
                    backgroundColor: light ? colors.light.accent : colors.dark.accent,
                    zIndex: 4,
                    overflow: 'hidden',
                    ...props.sx
                }}
            >
                {props.children}
            </Container>
        )
    }

    return props.cover ? (
        <>
            <Cover onClose={props.onClose} dismissable show={props.show} />
            {renderOverlay()}
        </>
    ) : (
        renderOverlay()
    )
}
