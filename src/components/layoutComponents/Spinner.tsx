import { CSSProperties, FunctionComponent } from 'react'
import { Container } from './Container'
import { keyframes } from '@emotion/react'
import { colors } from '../Colors'
import { useDarkTheme } from '../../providers'

export interface SpinnerProps {
    sx?: CSSProperties
    spinnerSx?: CSSProperties
    swapColor?: boolean
}

const rotation = keyframes({
    '0%': {
        transform: 'rotate(0deg)'
    },
    '100%': {
        transform: 'rotate(360deg)'
    }
})

export const Spinner: FunctionComponent<SpinnerProps> = (props) => {
    const { light } = useDarkTheme()

    const themeColors = light ? colors.light : colors.dark

    return (
        <Container
            sx={{
                width: '30px',
                height: '30px',
                ...props.sx
            }}
        >
            <Container
                sx={{
                    position: 'absolute',
                    boxSizing: 'border-box',
                    border: '3px solid',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    animation: `${rotation} 1.2s cubic-bezier(0.5,0,0.5,1) infinite`,
                    animationDelay: '-0.45s',
                    borderColor: 'transparent',
                    borderTopColor: props.swapColor
                        ? themeColors.foreground
                        : themeColors.background,
                    ...props.spinnerSx
                }}
            />
            <Container
                sx={{
                    position: 'absolute',
                    boxSizing: 'border-box',
                    border: '3px solid',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    animation: `${rotation} 1.2s cubic-bezier(0.5,0,0.5,1) infinite`,
                    animationDelay: '-0.3s',
                    borderColor: 'transparent',
                    borderTopColor: props.swapColor
                        ? themeColors.foreground
                        : themeColors.background,
                    ...props.spinnerSx
                }}
            />
            <Container
                sx={{
                    position: 'absolute',
                    boxSizing: 'border-box',
                    border: '3px solid',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    animation: `${rotation} 1.2s cubic-bezier(0.5,0,0.5,1) infinite`,
                    animationDelay: '-0.15s',
                    borderColor: 'transparent',
                    borderTopColor: props.swapColor
                        ? themeColors.foreground
                        : themeColors.background,
                    ...props.spinnerSx
                }}
            />
            <Container
                sx={{
                    position: 'absolute',
                    boxSizing: 'border-box',
                    border: '3px solid',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    animation: `${rotation} 1.2s cubic-bezier(0.5,0,0.5,1) infinite`,
                    borderColor: 'transparent',
                    borderTopColor: props.swapColor
                        ? themeColors.foreground
                        : themeColors.background,
                    ...props.spinnerSx
                }}
            />
        </Container>
    )
}
