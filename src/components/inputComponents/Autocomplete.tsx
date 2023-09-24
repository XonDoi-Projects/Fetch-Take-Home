import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { TextField, TextFieldProps } from './TextField'
import { useClickOutside } from '../hooks'
import { Container, OptionButton, Popup } from '../layoutComponents'
import { Button } from './Button'
import { BiChevronDown } from 'react-icons/bi'

export interface AutocompleteProps extends Omit<TextFieldProps, 'type'> {
    list: string[]
}

export const Autocomplete: FunctionComponent<AutocompleteProps> = ({ onChange, ...props }) => {
    const [show, setShow] = useState(false)

    const ref = useRef<HTMLInputElement | null>(null)
    const popupRef = useRef<HTMLDivElement | null>(null)

    const [textDOMRect, setTextDOMRect] = useState<DOMRect>()

    useEffect(() => {
        if (ref.current) {
            setTextDOMRect(ref.current.getBoundingClientRect())
        }
    }, [show])

    useClickOutside(popupRef, () => setShow(false))

    return (
        <Container ref={ref} sx={props.containerSx}>
            <TextField
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
                    width: textDOMRect ? textDOMRect?.width : 100,
                    top: textDOMRect ? textDOMRect?.height : 0,
                    left: 0,
                    borderRadius: '10px',
                    height: 'fit-content'
                }}
            >
                <Container
                    sx={{
                        borderRadius: '10px',
                        flexDirection: 'column',
                        maxHeight: '200px',
                        overflow: 'auto'
                    }}
                >
                    {props.list.map((item, index) => (
                        <OptionButton
                            key={index}
                            item={item}
                            onChange={onChange}
                            setShow={setShow}
                        />
                    ))}
                </Container>
            </Popup>
        </Container>
    )
}
