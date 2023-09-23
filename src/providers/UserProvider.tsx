import { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface User {
    name: string
    email: string
}

export interface IUserContext {
    user?: User
    setUser: (value?: User) => void
}

export const UserContext = createContext<IUserContext | undefined>(undefined)

export interface IUserProviderProps {
    children: ReactNode
}

export const UserProvider: FunctionComponent<IUserProviderProps> = (props) => {
    const [user, setUser] = useState<User>()

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            navigate('/')
        }
    }, [navigate, user])

    return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>
}

export const useUser = () => {
    const ctx = useContext(UserContext)

    if (!ctx) {
        throw new Error('User context not found! Check your AppProvider')
    }

    return ctx
}
