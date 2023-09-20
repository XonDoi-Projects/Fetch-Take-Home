import { CSSProperties, FunctionComponent } from 'react'
import { colors } from '../Colors'
import { Button } from './Button'
import { BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi'
import { useDarkTheme } from '../../providers'
import { Container } from '../layoutComponents'
import { Typography } from '../layoutComponents/Typography'

export interface RadioButtonGroupProps {
    buttonList: string[]
    contentSx?: CSSProperties
    direction?: 'left' | 'right'
    value: string
    onChange: (value: string) => void
    sx?: CSSProperties
}

export const RadioButtonGroup: FunctionComponent<RadioButtonGroupProps> = (props) => {
    const { light } = useDarkTheme()

    const onValueChange = (value: string) => {
        props.onChange(value)
    }

    return (
        <Container
            sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                ...props.contentSx
            }}
        >
            {props.buttonList.map((button, index) => (
                <Container
                    key={index}
                    sx={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        onClick={() => onValueChange(button)}
                        sx={{
                            margin: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '20px',
                            width: '20px',
                            borderRadius: '50%',
                            padding: '0px',
                            backgroundColor: 'transparent',
                            ...props.sx
                        }}
                    >
                        {props.value !== button ? (
                            <BiRadioCircle
                                color={light ? colors.light.foreground : colors.dark.foreground}
                                style={{ fontSize: '20px' }}
                            />
                        ) : (
                            <BiRadioCircleMarked
                                color={light ? colors.light.foreground : colors.dark.foreground}
                                style={{ fontSize: '20px' }}
                            />
                        )}
                    </Button>
                    <Typography
                        variant="small"
                        sx={{
                            fontWeight: 500,
                            marginRight: '20px',
                            color: light ? colors.light.foreground : colors.dark.foreground
                        }}
                    >
                        {button}
                    </Typography>
                </Container>
            ))}
        </Container>
    )
}

RadioButtonGroup.defaultProps = { direction: 'right' }
