import styled from '@emotion/styled'
import { CSSProperties, FunctionComponent, HTMLProps } from 'react'
import { colors } from '../Colors'
import { useDarkTheme } from '../../providers'

export interface StyledCardProps extends HTMLProps<HTMLDivElement> {
    sx?: CSSProperties
}

export const StyledCard = styled.div<StyledCardProps>(({ sx }) => ({
    display: 'flex',
    borderRadius: '5px',
    ...sx
}))

export const Card: FunctionComponent<StyledCardProps> = (props) => {
    const { light } = useDarkTheme()

    return (
        <StyledCard
            sx={{
                backgroundColor: light ? colors.light.card : colors.dark.card,
                boxShadow: `0 0px 15px  ${light ? colors.light.shadow : colors.dark.shadow}`,
                ...props.sx
            }}
        >
            {props.children}
        </StyledCard>
    )
}
