import {Color} from '@material-ui/lab';
import * as React from 'react';
import {createPortal} from 'react-dom';
import {Toast} from '../components/ToastComponent';

export interface ContentProps {
    text: string;
    severity: Color;
}

export const ToastsContext = React.createContext({
    addToast: (toast: ContentProps) => {
        !toast.text && new Error('To add a toast, wrap the app in a ToastsProvider.');
        return toast
    }
});

let counter = 0;

const getUniqueId = () => `id-${counter++}`;

export const ToastsProvider = (props: React.PropsWithChildren<React.ReactNode>) => {
    const [toasts, setToasts] = React.useState([]);

    const addToast = React.useCallback((content, options = {}) => {
        const { autoDismiss = true } = options;
        const toastId = getUniqueId();

        const toast = {
            id: toastId,
            content,
            autoDismiss,
            remove: () => {
                setToasts((latestToasts) => latestToasts.filter(({ id }) => id !== toastId))
            }
        };

        setToasts((latestToasts) => [ ...latestToasts, toast ])
    }, []);

    const contextValue = React.useMemo(() => ({
        addToast,
    }), [addToast]);

    return (
        <ToastsContext.Provider value={contextValue}>
            {props.children}

            {createPortal((
                <>
                    {toasts.map((toast) => <Toast key={toast.id} {...toast} />)}
                </>
            ), document.body)}
        </ToastsContext.Provider>
    )
};
