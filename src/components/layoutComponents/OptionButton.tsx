import { FunctionComponent, useState } from 'react'
import { Container } from './Container'
import { Typography } from './Typography'
import { useDarkTheme } from '../../providers'
import { colors } from '../Colors'

export interface OptionButtonProps {
    item: string
    onChange: (value: string) => void
    setShow: (value: boolean) => void
}

export const OptionButton: FunctionComponent<OptionButtonProps> = (props) => {
    const [hover, setHover] = useState(false)
    const { light } = useDarkTheme()

    return (
        <Container
            sx={{
                display: 'flex',
                padding: '5px',
                alignItems: 'center',
                height: '50px',
                cursor: 'pointer',
                backgroundColor: hover
                    ? light
                        ? colors.light.accent + '80'
                        : colors.dark.accent + '80'
                    : undefined
            }}
            onClick={() => {
                props.onChange(props.item)
                props.setShow(false)
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Typography
                sx={{
                    pointerEvents: 'none',
                    color: hover
                        ? light
                            ? colors.light.textOnAccent
                            : colors.dark.textOnAccent
                        : light
                        ? colors.light.text
                        : colors.dark.text
                }}
            >
                {props.item}
            </Typography>
        </Container>
    )
}
