import {Snackbar} from '@material-ui/core';
import * as React from 'react';
import {createPortal} from 'react-dom';

// TODO to be refactoored
let counter = 0;

const getUniqueId = () => `id-${counter++}`;

const ToastsContext = React.createContext({
    addToast: () => {
        throw new Error('To add a toast, wrap the app in a ToastsProvider.')
    }
});

export const ToastsProvider = (props: any) => {
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

export const useToasts = () => {
    return React.useContext(ToastsContext)
};


const Toast = ({ content, autoDismiss, remove }) => {
    React.useEffect(() => {
        if (autoDismiss) {
            const timeoutHandle = setTimeout(remove, 4000);

            return () => clearTimeout(timeoutHandle)
        }
    }, [autoDismiss, remove])

    return (
        <Snackbar
            open={!!content}
            onClose={remove}
            message={content}
        />
    )
};
