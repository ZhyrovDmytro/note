import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {App} from './App';
import {ToastsProvider} from './hooks/useToast';

ReactDOM.render(
    <ToastsProvider>
        <App />
    </ToastsProvider>
    , document.getElementById('root'));
