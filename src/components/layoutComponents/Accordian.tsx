import { CSSProperties, FunctionComponent, useState } from 'react'
import { Container } from './Container'
import { Typography } from './Typography'
import { colors } from '../Colors'
import { BiChevronRight } from 'react-icons/bi'
import { useDarkTheme } from '../../providers'
import { Button } from '../inputComponents'

export interface AccordianProps {
    title: string
    data?: string[]
    sx?: CSSProperties
}

export const Accordian: FunctionComponent<AccordianProps> = (props) => {
    const [show, setShow] = useState(false)
    const { light } = useDarkTheme()

    return (
        <Container
            sx={{
                flex: show ? 1 : 0,
                flexDirection: 'column',
                minHeight: '50px',
                maxHeight: show && props.data ? (props.data.length + 1) * 50 + 'px' : '50px',
                height: show && props.data ? (props.data.length + 1) * 50 + 'px' : '50px',
                transition: 'all 0.3s',
                backgroundColor: light ? colors.light.background : colors.dark.background,
                border: '1px solid',
                borderColor: light ? colors.light.accent : colors.dark.accent,
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                ...props.sx
            }}
            onClick={() => setShow(!show)}
        >
            <Container
                sx={{
                    backgroundColor: light ? colors.light.accent : colors.dark.accent,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0px 10px',
                    height: '50px'
                }}
            >
                <Typography
                    sx={{
                        margin: '0px',
                        color: light ? colors.light.accentForeground : colors.dark.accentForeground
                    }}
                >
                    {props.title}
                </Typography>
                <Button
                    sx={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        transform: show ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                        padding: '0px',
                        backgroundColor: 'transparent'
                    }}
                    onClick={() => setShow(!show)}
                    swapHover
                >
                    <BiChevronRight
                        style={{
                            fontSize: '32px',
                            color: light
                                ? colors.light.accentForeground
                                : colors.dark.accentForeground
                        }}
                    />
                </Button>
            </Container>
            {props.data?.map((item, index) => (
                <Container
                    key={index}
                    sx={{
                        height: '50px',
                        paddingLeft: '10px',
                        alignItems: 'center'
                    }}
                >
                    <Typography>{item}</Typography>
                </Container>
            ))}
        </Container>
    )
}
