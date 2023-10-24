import React from 'react'
import ReactDOM from 'react-dom/client'
import DevTools from './DevTools'
import './init'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <DevTools/>
    </React.StrictMode>
)