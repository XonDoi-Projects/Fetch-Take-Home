import React, {
    CSSProperties,
    forwardRef,
    FunctionComponent,
    ReactNode,
    Ref,
    useEffect,
    useRef,
    useState
} from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { Container } from './Container'

export interface FadeInOutProps {
    sx?: CSSProperties
    show?: boolean
    hideFadeIn?: boolean
    hideFadeOut?: boolean
    children?: ReactNode
    ref?: Ref<HTMLDivElement>
}

const FadeInOutDiv = styled(Container)<FadeInOutProps>(({ show, sx }) => ({
    ...sx
}))

const showFrames = keyframes({
    from: {
        opacity: 0
        // width: '0%',
        // height: '0%'
    },
    to: {
        opacity: 1
        // width: '100%',
        // height: '100%'
    }
})

const hideFrames = keyframes({
    from: {
        opacity: 1
        // width: '100%',
        // height: '100%'
    },
    to: {
        opacity: 0
        // width: '0%',
        // height: '0%'
    }
})

export const FadeInOut: FunctionComponent<FadeInOutProps> = forwardRef(
    ({ hideFadeIn, hideFadeOut, show, children, sx, ...props }, ref) => {
        const [display, setDisplay] = useState<boolean | undefined>(show)
        let timeoutReference = useRef<NodeJS.Timeout | undefined>()

        useEffect(() => {
            if (timeoutReference.current !== undefined) {
                clearTimeout(timeoutReference.current)
            }

            if (show) {
                if (hideFadeIn) {
                    timeoutReference.current = setTimeout(() => {
                        setDisplay(true)
                    }, 300)
                } else {
                    setDisplay(true)
                }
            } else {
                if (hideFadeOut) {
                    setDisplay(false)
                } else {
                    timeoutReference.current = setTimeout(() => {
                        setDisplay(false)
                    }, 300)
                }
            }
        }, [show, hideFadeIn, hideFadeOut])

        return display ? (
            <FadeInOutDiv
                {...props}
                show={show}
                sx={{
                    animationName: `${show ? showFrames : hideFrames}`,
                    animationDuration: '0.3s',
                    animationTimingFunction: 'linear',
                    ...sx
                }}
                ref={ref}
            >
                {children}
            </FadeInOutDiv>
        ) : (
            <></>
        )
    }
)

FadeInOut.displayName = 'FadeInOut'
