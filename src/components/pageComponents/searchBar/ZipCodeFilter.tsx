import { cloneDeep } from 'lodash'
import { Container } from '../../layoutComponents'
import { FunctionComponent, useEffect, useState } from 'react'
import { Button, TextField } from '../../inputComponents'
import { BiPlus, BiX } from 'react-icons/bi'
import { useDarkTheme } from '../../../providers'
import { colors } from '../../Colors'
import { Typography } from '../../layoutComponents/Typography'

export interface ZipCodeFilterProps {
    zipCodes: string[]
    setZipCodes: (value: string[]) => void
}

export const ZipCodeFilter: FunctionComponent<ZipCodeFilterProps> = (props) => {
    const { light } = useDarkTheme()
    const [zipCode, setZipCode] = useState('')

    const handleAddZipCode = () => {
        const tempZipCodes = cloneDeep(props.zipCodes)

        if (zipCode) {
            if (tempZipCodes.every((code) => code !== zipCode)) {
                tempZipCodes.push(zipCode)
            }
        }

        props.setZipCodes(tempZipCodes)
    }

    const handleRemoveZipCode = (zipCode: string) => {
        const tempZipCodes = cloneDeep(props.zipCodes)

        if (zipCode) {
            const match = tempZipCodes.findIndex((z) => z === zipCode)

            if (match >= 0) {
                tempZipCodes.splice(match, 1)
            }
        }

        props.setZipCodes(tempZipCodes)
    }

    useEffect(() => {
        if (props.zipCodes) {
            setZipCode('')
        }
    }, [props.zipCodes])

    return (
        <Container
            sx={{ flexDirection: 'column', height: 'fit-content', overflow: 'hidden', gap: '10px' }}
        >
            <TextField
                value={zipCode}
                onChange={(e) => {
                    if (/^[0-9]*$/i.test(e)) {
                        setZipCode(e)
                    }
                }}
                label="Zip Code"
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
                        onClick={handleAddZipCode}
                    >
                        <BiPlus style={{ fontSize: '15px' }} />
                    </Button>
                }
                hideHelper
            />
            {props.zipCodes.length ? (
                <Container
                    sx={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        width: '100%',
                        maxHeight: '100px',
                        overflow: 'auto',
                        gap: '10px'
                    }}
                >
                    {props.zipCodes.map((zipCode, index, array) => (
                        <Container key={zipCode + index} sx={{ gap: '10px' }}>
                            <Container
                                sx={{
                                    backgroundColor: light
                                        ? colors.light.accent
                                        : colors.dark.accent,
                                    height: '25px',
                                    width: 'fit-content',
                                    padding: '5px 10px',
                                    borderRadius: '12.5px',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '10px'
                                }}
                            >
                                <Typography
                                    variant="small"
                                    sx={{
                                        margin: '0',
                                        color: light
                                            ? colors.light.background
                                            : colors.dark.background
                                    }}
                                >
                                    {zipCode}
                                </Typography>
                                <Button
                                    sx={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        padding: '0px',
                                        backgroundColor: light
                                            ? colors.light.card
                                            : colors.dark.card
                                    }}
                                    onClick={() => handleRemoveZipCode(zipCode)}
                                >
                                    <BiX style={{ fontSize: '20px' }} />
                                </Button>
                            </Container>
                            {index < array.length - 1 ? (
                                <Typography
                                    sx={{
                                        margin: '0px',
                                        color: light ? colors.light.accent : colors.dark.accent
                                    }}
                                >
                                    •
                                </Typography>
                            ) : (
                                <></>
                            )}
                        </Container>
                    ))}
                </Container>
            ) : (
                <></>
            )}
        </Container>
    )
}
