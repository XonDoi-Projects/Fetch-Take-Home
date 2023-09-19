import { FunctionComponent } from 'react'
import { Container } from './Container'

export interface CoverProps {
    dismissable?: boolean
    onClose?: () => void
    show?: boolean
}

export const Cover: FunctionComponent<CoverProps> = (props) => {
    return props.show ? (
        <Container
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100vw',
                backgroundColor: 'rgba(10,10,10,0.3)',
                zIndex: 3
            }}
            onClick={() => props.onClose && props.onClose()}
        />
    ) : (
        <></>
    )
}
