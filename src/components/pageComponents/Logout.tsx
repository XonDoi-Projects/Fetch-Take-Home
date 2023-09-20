import { useCallback, useEffect, useRef, useState } from 'react'
import { Container, FadeInOut, FixedDiv, Spinner } from '../layoutComponents'
import { Typography } from '../layoutComponents/Typography'
import { colors } from '../Colors'
import { useSize, useUser } from '../../providers'
import { useNavigate } from 'react-router-dom'
import { FETCH_BASE_URL } from '../env'

export const Logout = () => {
    const mobile = useSize()
    const { setUser } = useUser()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [snackbar, setSnackbar] = useState<{ message: string; color: string }>()
    const [showSnackbar, setShowSnackbar] = useState(false)

    const timeoutRef = useRef<NodeJS.Timeout>()

    const logout = useCallback(async () => {
        setLoading(true)
        try {
            const result = await fetch(`${FETCH_BASE_URL}/auth/logout`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                credentials: 'include'
            })

            if (result.status === 200) {
                setUser(undefined)
                navigate('/login')
            }
        } catch (e: any) {
            console.log(e)
            setSnackbar({
                message: e.message,
                color: colors.light.error
            })
            setShowSnackbar(true)
        }
        setLoading(false)
    }, [navigate, setUser])

    useEffect(() => {
        logout()
    }, [logout])

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

    return (
        <>
            <Container
                sx={{
                    width: '100vw',
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography>Logging you out!</Typography>
                {loading ? <Spinner /> : <></>}
            </Container>
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
        </>
    )
}
