import * as React from 'react';
import { ToastsContext } from '../context/ToastContext';

export const useToasts = () => {
    return React.useContext(ToastsContext)
};
