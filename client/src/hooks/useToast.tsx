import * as React from 'react';

export const useToast = () => {
    return React.useCallback((text): void => {
        if(text) {
            alert(text);
        }
    }, []);
};
