import { CSSProperties, FunctionComponent, ReactNode } from 'react'
import { Container } from './Container'
import { Typography } from './Typography'
import { colors } from '../Colors'
import { useDarkTheme } from '../../providers'

export interface FieldContainerProps {
    sx?: CSSProperties
    label?: string
    errorText?: string
    helperText?: string
    children?: ReactNode
    isFocus?: boolean
}

export const FieldContainer: FunctionComponent<FieldContainerProps> = (props) => {
    const { light } = useDarkTheme()
    return (
        <Container sx={{ flexDirection: 'column' }}>
            <Container>
                <Typography
                    variant="field"
                    sx={{
                        color: props.errorText
                            ? light
                                ? colors.light.error
                                : colors.dark.error
                            : light
                            ? colors.dark.background
                            : colors.light.background,
                        marginBottom: '0px'
                    }}
                >
                    {props.label || ''}
                </Typography>
            </Container>
            <Container
                sx={{
                    border: '1px solid',
                    borderColor: props.errorText
                        ? light
                            ? colors.light.error
                            : colors.dark.error
                        : props.isFocus
                        ? light
                            ? colors.light.secondary
                            : colors.dark.secondary
                        : light
                        ? colors.dark.background
                        : colors.light.background,
                    borderRadius: '4px',
                    marginBottom: '0px'
                }}
            >
                {props.children}
            </Container>
            <Container sx={{ height: '12px' }}>
                <Typography
                    variant="small"
                    sx={{
                        color: props.errorText
                            ? light
                                ? colors.light.error
                                : colors.dark.error
                            : light
                            ? colors.dark.background
                            : colors.light.background,
                        margin: '0px'
                    }}
                >
                    {props.errorText || props.helperText}
                </Typography>
            </Container>
        </Container>
    )
}
