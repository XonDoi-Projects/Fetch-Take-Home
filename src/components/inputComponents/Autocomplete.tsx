import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { TextField, TextFieldProps } from './TextField'
import { useClickOutside } from '../hooks'
import { Container, Popup } from '../layoutComponents'
import { useDarkTheme, useSize } from '../../providers'
import { Typography } from '../layoutComponents/Typography'
import { colors } from '../Colors'
import { Button } from './Button'
import { BiChevronDown } from 'react-icons/bi'

export interface AutocompleteProps extends Omit<TextFieldProps, 'type'> {
    list: string[]
}

export const Autocomplete: FunctionComponent<AutocompleteProps> = ({ onChange, ...props }) => {
    const { mobile } = useSize()
    const { light } = useDarkTheme()

    const [show, setShow] = useState(false)

    const ref = useRef<HTMLInputElement | null>(null)
    const popupRef = useRef<HTMLDivElement | null>(null)

    const [textDOMRect, setTextDOMRect] = useState<DOMRect>()

    useEffect(() => {
        if (ref.current) {
            setTextDOMRect(ref.current.getBoundingClientRect())
        }
    }, [mobile])

    useClickOutside(popupRef, () => setShow(false))

    return (
        <Container>
            <TextField
                ref={ref}
                {...props}
                onChange={() => null}
                fieldContainerSx={{ paddingRight: '10px' }}
                suffix={
                    <Button
                        sx={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            padding: '0px',
                            backgroundColor: 'transparent'
                        }}
                        onClick={() => setShow(true)}
                    >
                        <BiChevronDown style={{ fontSize: '15px' }} />
                    </Button>
                }
            />

            <Popup
                popupRef={popupRef}
                show={show}
                sx={{
                    width: textDOMRect ? textDOMRect?.width + 30 : 100,
                    top: textDOMRect ? textDOMRect?.height + 10 : 0,
                    left: 0,
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: light ? colors.dark.background : colors.light.background,
                    height: 'fit-content'
                }}
            >
                {props.list.map((item, index) => (
                    <Container
                        key={index}
                        sx={{
                            display: 'flex',
                            padding: '5px',
                            alignItems: 'center'
                        }}
                        onClick={() => {
                            onChange(item)
                            setShow(false)
                        }}
                    >
                        <Typography sx={{ fontWeight: 600, pointerEvents: 'none' }}>
                            {item}
                        </Typography>
                    </Container>
                ))}{' '}
            </Popup>
        </Container>
    )
}
