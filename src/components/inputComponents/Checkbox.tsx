import React, { CSSProperties, FunctionComponent, useCallback } from 'react'
import styled from '@emotion/styled'
import { BsCheck, BsDash } from 'react-icons/bs'
import { useDarkTheme } from '../../providers'
import { colors } from '../Colors'
import { Container } from '../layoutComponents'
import { Typography } from '../layoutComponents/Typography'

export type CheckboxValue = 'yes' | 'indetermined' | 'no'

export interface ICheckboxStyle {
    sx?: CSSProperties
    readOnly?: boolean
}

export interface CheckboxProps extends ICheckboxStyle {
    typographySx?: CSSProperties
    label?: string
    value: CheckboxValue
    onChange(e: CheckboxValue): void
}

const HiddenNativeCheckbox = styled.input({
    border: 'none',
    clip: `rect(0 0 0 0)`,
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
})

interface StyledCheckboxProps extends ICheckboxStyle {
    value: CheckboxValue
}

const StyledCheckbox = styled.div<StyledCheckboxProps>(({ sx, value, readOnly }) => {
    const { backgroundColor, ...restOfSx } = sx || {}

    return {
        display: 'inline-block',
        width: '14px',
        height: '14px',
        borderWidth: '1px',
        borderStyle: 'solid',
        margin: '5px',
        backgroundColor:
            value === 'yes' || value === 'indetermined' ? backgroundColor : 'transparent',
        opacity: readOnly ? 0.5 : 1,
        borderRadius: '3px',
        transition: 'all 150ms',
        ...restOfSx
    }
})

export const Checkbox: FunctionComponent<CheckboxProps> = ({ onChange, ...props }) => {
    const { light } = useDarkTheme()

    const renderIcon = () => {
        return props.value === 'indetermined' ? (
            <BsDash
                style={{
                    color: light ? colors.light.background : colors.dark.background,
                    margin: '-1px 0px 0px -1px'
                }}
            />
        ) : props.value === 'yes' ? (
            <BsCheck
                style={{
                    color: light ? colors.light.background : colors.dark.background,
                    margin: '-1px 0px 0px -1px'
                }}
            />
        ) : (
            <></>
        )
    }

    const click = useCallback(() => {
        if (!props.readOnly) {
            if (props.value === 'no' || props.value === 'indetermined') {
                onChange('yes')
            } else {
                onChange('no')
            }
        }
    }, [onChange, props.readOnly, props.value])

    const stopOnChange = () => {}

    const renderCheckbox = () => (
        <>
            <HiddenNativeCheckbox
                type="checkbox"
                checked={props.value === 'yes'}
                onChange={stopOnChange}
            />
            <StyledCheckbox
                readOnly={props.readOnly}
                value={props.value}
                sx={{
                    backgroundColor: light ? colors.light.accent : colors.dark.accent,
                    borderColor: light ? colors.light.accent : colors.dark.accent
                }}
            >
                {renderIcon()}
            </StyledCheckbox>
        </>
    )

    return (
        <Container
            sx={{
                flexDirection: 'row',
                width: 'fit-content',
                cursor: 'pointer',
                ...props.sx
            }}
            onClick={click}
        >
            {props.label ? (
                <Container
                    sx={{
                        flexDirection: 'row',
                        height: '38px',
                        alignItems: 'center',
                        pointerEvents: 'none'
                    }}
                >
                    {renderCheckbox()}
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            color: light ? colors.dark.background : colors.light.background,
                            ...props.typographySx
                        }}
                        variant="small"
                    >
                        {props.label}
                    </Typography>
                </Container>
            ) : (
                <Container sx={{ height: '38px', justifyContent: 'center', pointerEvents: 'none' }}>
                    {renderCheckbox()}
                </Container>
            )}
        </Container>
    )
}
