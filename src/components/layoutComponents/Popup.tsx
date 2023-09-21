import { CSSProperties, FunctionComponent, MutableRefObject, ReactNode } from 'react'
import { Container } from './Container'
import { Card } from './Card'

export interface PopupProps {
    children: ReactNode
    popupRef: MutableRefObject<HTMLDivElement | null>
    show: boolean
    sx?: CSSProperties
}

export const Popup: FunctionComponent<PopupProps> = (props) => {
    return props.show ? (
        <Container
            ref={props.popupRef}
            sx={{
                position: 'absolute',
                height: props.show ? 50 + 'px' : '0px',
                zIndex: 9999,
                transition: 'height 0.4s',
                transitionTimingFunction: 'cubic-bezier(0, 0, 0, 1)',
                overflow: 'visible',
                ...props.sx
            }}
        >
            <Card
                sx={{
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    borderRadius: '0px'
                }}
            >
                {props.children}
            </Card>
        </Container>
    ) : (
        <></>
    )
}
