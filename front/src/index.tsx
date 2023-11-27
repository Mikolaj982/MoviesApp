import React from 'react';
import {createRoot} from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.scss'
import {App} from "./App";
import {BrowserRouter} from "react-router-dom";

const root = createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

reportWebVitals();
