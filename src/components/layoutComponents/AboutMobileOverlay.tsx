import { FunctionComponent, useEffect, useState } from 'react'
import { FixedDiv } from './FixedDiv'
import { BiSolidSquare, BiSquare } from 'react-icons/bi'
import { Container } from './Container'
import { colors } from '../Colors'
import { keyframes } from '@emotion/react'
import { useDarkTheme } from '../../providers'

export interface AboutMobileOverlayProps {
    show: boolean
    showIndex?: number
    setShowIndex?: (value: number) => void
}

const rotateScale = keyframes({
    '0%': {
        transform: 'rotate(0deg) scale(1)'
    },
    '100%': {
        transform: 'rotate(90deg) scale(1.5)'
    }
})

const rotateDownScale = keyframes({
    '00%': {
        transform: 'rotate(0deg) scale(1.5)'
    },
    '100%': {
        transform: 'rotate(-90deg) scale(1)'
    }
})

export const AboutMobileOverlay: FunctionComponent<AboutMobileOverlayProps> = (props) => {
    const { light } = useDarkTheme()

    const [prevState, setPrevState] = useState<number[]>([0, 0])

    useEffect(() => {
        if (props.showIndex !== undefined) {
            setPrevState((prev) => {
                prev.unshift(props.showIndex || 0)
                prev.pop()
                return prev
            })
        }
    }, [props.showIndex])

    return props.show ? (
        <FixedDiv
            sx={{
                right: 10,
                flexDirection: 'column',
                top: '50%',
                transform: 'translate(0,-50%)',
                width: '30px',
                height: '100px',
                justifyContent: 'center'
            }}
        >
            <Container
                sx={{
                    width: '30px',
                    height: '30px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    animation: `${
                        props.showIndex === 0
                            ? rotateScale
                            : prevState[0] === 0
                            ? rotateDownScale
                            : ''
                    }`,
                    animationDuration: '0.2s',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'forwards'
                }}
                onClick={() => props.setShowIndex && props.setShowIndex(0)}
            >
                {props.showIndex === 0 ? (
                    <BiSolidSquare
                        fill={light ? colors.light.accent : colors.dark.accent}
                        stroke={light ? colors.light.accent : colors.dark.accent}
                        strokeWidth={'1px'}
                    />
                ) : (
                    <BiSquare
                        fill={light ? colors.light.background : colors.dark.background}
                        stroke={light ? colors.light.accent : colors.dark.accent}
                        strokeWidth={'2px'}
                    />
                )}
            </Container>
            <Container
                sx={{
                    width: '30px',
                    height: '30px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    animation: `${
                        props.showIndex === 1
                            ? rotateScale
                            : prevState[0] === 1
                            ? rotateDownScale
                            : ''
                    }`,
                    animationDuration: '0.2s',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'forwards'
                }}
                onClick={() => props.setShowIndex && props.setShowIndex(1)}
            >
                {props.showIndex === 1 ? (
                    <BiSolidSquare
                        fill={light ? colors.light.accent : colors.dark.accent}
                        stroke={light ? colors.light.accent : colors.dark.accent}
                        strokeWidth={'1px'}
                    />
                ) : (
                    <BiSquare
                        fill={light ? colors.light.background : colors.dark.background}
                        stroke={light ? colors.light.accent : colors.dark.accent}
                        strokeWidth={'2px'}
                    />
                )}
            </Container>
            <Container
                sx={{
                    width: '30px',
                    height: '30px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    animation: `${
                        props.showIndex === 2
                            ? rotateScale
                            : prevState[0] === 2
                            ? rotateDownScale
                            : ''
                    }`,
                    animationDuration: '0.2s',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'forwards'
                }}
                onClick={() => props.setShowIndex && props.setShowIndex(2)}
            >
                {props.showIndex === 2 ? (
                    <BiSolidSquare
                        fill={light ? colors.light.accent : colors.dark.accent}
                        stroke={light ? colors.light.accent : colors.dark.accent}
                        strokeWidth={'1px'}
                    />
                ) : (
                    <BiSquare
                        fill={light ? colors.light.background : colors.dark.background}
                        stroke={light ? colors.light.accent : colors.dark.accent}
                        strokeWidth={'2px'}
                    />
                )}
            </Container>
        </FixedDiv>
    ) : (
        <></>
    )
}
