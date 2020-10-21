import * as React from 'react';

export const useAuth = () => {
    const [token, setToken] = React.useState(null);
    const [userId, setUserId] = React.useState(null);
    const [ready, setReady] = React.useState(false);
    const storageName = 'userData';

    const login = React.useCallback((jwtToken: string, id: string) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken}));
    }, []);
    const logout = React.useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem(storageName);
    }, []);

    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if(data && data.token) {
            login(data.token, data.userId)
        }

        setReady(true);
    }, [token, login]);

    return { login, logout, token, userId, ready}
};
