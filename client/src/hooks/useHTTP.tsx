import * as React from 'react';

export const useHTTP = () => {
    const [loading, setLoading] = React.useState(false);
    const [err, setErr] = React.useState(null);
    const [ready, setReady] = React.useState(false);


    const req = React.useCallback(async (url: string, method: string = 'GET', body: any = null, headers = {}
    ) => {
        setLoading(true);
        setReady(false);

        try {
            if(body) {
                body = JSON.stringify((body));
                headers['Content-Type'] = 'application/json';
            }
            const res = await fetch(url, {
                method,
                body,
                headers
            });

            const data = await res.json();

            if(!res.ok) {
                throw new Error('Something went wrong');
            }

            setLoading(false);
            setReady(true);
            return data;
        } catch (e) {
            setLoading(false);
            setReady(true);
            setErr(e.message);
            console.error(e.message);
        }
    },[]);

    const clearErr = React.useCallback(() => setErr(null), []);
    return {loading, err, clearErr, req, ready}
};
