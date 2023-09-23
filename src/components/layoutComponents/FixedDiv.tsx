import { CSSProperties, FunctionComponent, ReactNode, Ref } from 'react'
import { Container } from './Container'

export interface FixedDivProps {
    sx?: CSSProperties
    children?: ReactNode
    ref?: Ref<HTMLDivElement>
}

export const FixedDiv: FunctionComponent<FixedDivProps> = (props) => {
    return (
        <Container sx={{ position: 'fixed', ...props.sx }} ref={props.ref}>
            {props.children}
        </Container>
    )
}
