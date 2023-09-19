import styled from '@emotion/styled'
import { CSSProperties, FunctionComponent, HTMLProps, ReactNode } from 'react'
import { colors } from '../Colors'
import { useDarkTheme } from '../../providers'
import { Container, Spinner } from '../layoutComponents'
import { Typography } from '../layoutComponents/Typography'

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    sx?: CSSProperties
    contentSx?: CSSProperties
    children?: ReactNode
    swapHover?: boolean
    loading?: boolean
}

interface StyledButtonProps extends ButtonProps {
    light?: boolean
}

export const StyledButton = styled.button<StyledButtonProps>(
    ({ sx, disabled, light, swapHover }) => ({
        display: 'flex',
        width: 'fit-content',
        height: '38px',
        backgroundColor: disabled ? 'grey' : light ? colors.light.accent : colors.dark.accent,
        cursor: disabled ? 'auto' : 'pointer',
        borderRadius: '5px',
        border: 'none',
        color: light ? colors.light.foreground : colors.dark.foreground,
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,

        '@media (hover:hover) and (pointer: fine)': {
            '&:hover': {
                backgroundColor: disabled
                    ? undefined
                    : light
                    ? swapHover
                        ? 'rgba(255,255,255,0.1)'
                        : 'rgba(0,0,0,0.1)'
                    : swapHover
                    ? 'rgba(0,0,0,0.1)'
                    : 'rgba(255,255,255,0.1)'
            }
        }
    })
)

export const Button: FunctionComponent<ButtonProps> = (props) => {
    const { light } = useDarkTheme()

    return (
        <Container
            sx={{
                justifyContent: props.sx?.justifyContent || 'center',
                alignItems: props.sx?.alignItems || 'center',
                width: props.sx?.width,
                height: props.sx?.height || '38px',
                backgroundColor: props.sx?.backgroundColor,
                borderRadius: props.sx?.borderRadius,
                ...props.contentSx
            }}
        >
            <StyledButton
                disabled={props.disabled}
                onClick={!props.disabled && !props.loading ? props.onClick : undefined}
                light={light}
                swapHover={props.swapHover}
                sx={{ justifyContent: 'center', alignItems: 'center', ...props.sx }}
            >
                {props.loading ? (
                    <Spinner />
                ) : typeof props.children === 'string' ? (
                    <Typography
                        variant="button"
                        sx={{ margin: '0px 10px', color: props.contentSx?.color }}
                    >
                        {props.children}
                    </Typography>
                ) : (
                    props.children
                )}
            </StyledButton>
        </Container>
    )
}
