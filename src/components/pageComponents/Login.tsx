import { useEffect, useRef, useState } from 'react'
import { useDarkTheme, useSize, useUser } from '../../providers'
import { Button, TextField } from '../inputComponents'
import { Card, Container, FadeInOut, FixedDiv } from '../layoutComponents'
import { Typography } from '../layoutComponents/Typography'
import { colors } from '../Colors'
import { FETCH_BASE_URL } from '../env'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const mobile = useSize()
    const { light } = useDarkTheme()
    const { setUser } = useUser()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState('')
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')

    const [loading, setLoading] = useState(false)

    const [snackbar, setSnackbar] = useState<{ message: string; color: string }>()
    const [showSnackbar, setShowSnackbar] = useState(false)

    const timeoutRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        if (timeoutRef.current !== undefined) {
            clearTimeout(timeoutRef.current)
        }

        if (showSnackbar) {
            timeoutRef.current = setTimeout(() => {
                setShowSnackbar(false)
            }, 3000)
        }
    }, [showSnackbar])

    const handleLogin = () => {
        setLoading(true)
        try {
            fetch(`${FETCH_BASE_URL}/auth/login`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ name, email }),
                credentials: 'include'
            }).then((res) => {
                if (res.status === 200) {
                    setSnackbar({ message: 'Login Successful!', color: colors.light.success })
                    setUser({ name, email })
                    navigate('/')
                } else {
                    setSnackbar({
                        message: `${res.status} - Something went wrong!`,
                        color: colors.light.error
                    })
                }
            })
            setShowSnackbar(true)
        } catch (e: any) {
            setSnackbar({ message: 'Request failed!', color: colors.light.error })
            setShowSnackbar(true)
        }
        setLoading(false)
    }

    const renderLoginForm = () => {
        return (
            <Container
                sx={{
                    flexDirection: 'column',
                    flex: 1,
                    gap: '10px',
                    padding: '20px',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}
            >
                <Typography variant="subtitle" sx={{ width: '100%', textAlign: 'left' }}>
                    Please login to continue
                </Typography>
                <Container sx={{ flexDirection: 'column', width: '100%' }}>
                    <TextField
                        value={name}
                        onChange={setName}
                        label="Name"
                        onBlur={(e: string) => {
                            if (!e) {
                                setErrorName('Name is required')
                            }
                        }}
                        errorText={errorName}
                        onKeyPress={handleLogin}
                    />
                    <TextField
                        value={email}
                        onChange={setEmail}
                        label="Email"
                        onBlur={(e: string) => {
                            if (!e) {
                                setErrorEmail('Email is required')
                            }
                        }}
                        errorText={errorEmail}
                        onKeyPress={handleLogin}
                    />
                </Container>
                <Button
                    onClick={handleLogin}
                    loading={loading}
                    sx={{
                        borderRadius: '19px',
                        color: light ? colors.light.textOnAccent : colors.dark.textOnAccent,
                        backgroundColor: light ? colors.light.accent : colors.dark.accent,
                        width: mobile.mobile ? '100%' : '100px'
                    }}
                    swapHover
                >
                    Login
                </Button>
            </Container>
        )
    }

    return (
        <Container sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {mobile.mobile ? (
                <Container sx={{ height: '400px', width: '300px' }}>{renderLoginForm()}</Container>
            ) : (
                <Card sx={{ height: '400px', width: '500px' }}>{renderLoginForm()}</Card>
            )}

            <FadeInOut show={showSnackbar} sx={{ zIndex: 3 }}>
                <FixedDiv
                    sx={{
                        bottom: '50px',
                        left: '50%',
                        transform: 'translate(-50%,0)',
                        height: '70px',
                        maxWidth: mobile.mobile ? mobile.size?.width + 'px' : '400px',
                        padding: '0px 20px',
                        overflow: 'hidden',
                        backgroundColor: snackbar?.color,
                        borderRadius: '35px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 3
                    }}
                >
                    <Typography
                        sx={{
                            color: colors.light.background,
                            fontSize: '16px',
                            textAlign: 'center',
                            margin: 0
                        }}
                    >
                        {snackbar?.message}
                    </Typography>
                </FixedDiv>
            </FadeInOut>
        </Container>
    )
}
