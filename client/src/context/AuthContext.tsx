import * as React from 'react';

const noop = (): void => {};

interface AuthContextProps {
    token: string | null,
    userId: string | null,
    login(jwtToken: string, id: string): void,
    logout(): void,
    isAuthenticated: boolean
}

export const AuthContext = React.createContext<AuthContextProps | null>({
    token: null,
    userId: null,
    login:  noop,
    logout: noop,
    isAuthenticated: false
});
