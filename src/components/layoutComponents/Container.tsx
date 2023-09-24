import styled from '@emotion/styled'
import { CSSProperties, FunctionComponent, HTMLProps, Ref, forwardRef } from 'react'
import { colors } from '../Colors'
import { useDarkTheme } from '../../providers'

export interface StyledContainerProps extends HTMLProps<HTMLDivElement> {
    'data-testid'?: string
    sx?: CSSProperties
    hidescrollBar?: boolean
    ref?: Ref<HTMLDivElement>
    light?: boolean
    swapScrollBar?: boolean
}

export const StyledContainer = styled.div<StyledContainerProps>(
    ({ sx, hidescrollBar, light, swapScrollBar }) => ({
        display: 'flex',
        position: 'relative',
        padding: '0',
        margin: '0',
        flexShrink: 0,
        flexGrow: 0,
        boxSizing: 'border-box',

        ...sx,
        '::-webkit-scrollbar': {
            width: '10px',
            height: '10px',
            backgroundColor: 'transparent',
            display: hidescrollBar ? 'none' : undefined
        },
        '::-webkit-scrollbar-thumb': {
            border: '2px solid transparent',
            backgroundClip: 'content-box',
            borderRadius: '8px',
            backgroundColor: swapScrollBar
                ? light
                    ? colors.light.background
                    : colors.dark.background
                : light
                ? colors.light.accent
                : colors.dark.accent
        },
        '::-webkit-scrollbar-track': {}
    })
)

export const Container: FunctionComponent<StyledContainerProps> = forwardRef((props, ref) => {
    const { light } = useDarkTheme()

    return (
        <StyledContainer
            data-testid={props['data-testid']}
            id={props.id}
            ref={ref}
            sx={{
                ...props.sx
            }}
            light={light}
            hidescrollBar={props.hidescrollBar}
            onClick={props.onClick}
            onWheel={props.onWheel}
            onTouchStart={props.onTouchStart}
            onTouchEnd={props.onTouchEnd}
            onTouchMove={props.onTouchMove}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            swapScrollBar={props.swapScrollBar}
        >
            {props.children}
        </StyledContainer>
    )
})

Container.displayName = 'Container'

StyledContainer.defaultProps = {
    hidescrollBar: false
}
