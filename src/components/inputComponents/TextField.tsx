import {
    CSSProperties,
    ChangeEvent,
    ForwardedRef,
    FunctionComponent,
    ReactNode,
    Ref,
    forwardRef,
    useState
} from 'react'
import styled from '@emotion/styled'
import { FieldContainer, FieldContainerProps } from '../layoutComponents'
import { useDarkTheme } from '../../providers'
import { colors } from '../Colors'

export interface TextFieldProps
    extends StyledInputProps,
        Omit<FieldContainerProps, 'sx' | 'children' | 'isFocus'> {
    fieldContainerSx?: CSSProperties
    containerSx?: CSSProperties
    value: string
    onChange: (value: string) => void
    onFocus?: () => void
    onKeyPress?: () => void
    onBlur?: (value: string) => void
    suffix?: ReactNode
    type?: 'text' | 'password'
    ref?: Ref<HTMLInputElement>
    hideHelper?: boolean
}

interface StyledInputProps {
    sx?: CSSProperties
}

const StyledInput = styled.input<StyledInputProps>(
    ({ sx }) => ({
        height: '40px',
        width: '100%',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'transparent',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 400,
        fontSize: '16px',
        outline: 'none',
        padding: '0px 10px',
        ...sx
    }),
    `:focus {
            outline: none;
        }`
)

export const TextField: FunctionComponent<TextFieldProps> = forwardRef(
    (
        {
            value,
            onChange,
            onFocus,
            onBlur,
            onKeyPress,
            sx,
            fieldContainerSx,
            containerSx,
            ...props
        },
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        const { light } = useDarkTheme()
        const [isFocus, setIsFocus] = useState(false)

        const onValueChange = (value: ChangeEvent<HTMLInputElement>) => {
            onChange(value.target.value)
        }

        return (
            <FieldContainer
                sx={fieldContainerSx}
                parentSx={containerSx}
                {...props}
                isFocus={isFocus}
            >
                <StyledInput
                    ref={ref}
                    type={props.type || 'text'}
                    value={value}
                    onChange={onValueChange}
                    sx={{ color: light ? colors.dark.background : colors.light.background, ...sx }}
                    onFocus={() => {
                        setIsFocus(true)
                        onFocus && onFocus()
                    }}
                    onBlur={(e) => {
                        setIsFocus(false)
                        onBlur && onBlur(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter') {
                            onKeyPress && onKeyPress()
                        }
                    }}
                />
                {props.suffix ? props.suffix : <></>}
            </FieldContainer>
        )
    }
)

TextField.displayName = 'TextField'
