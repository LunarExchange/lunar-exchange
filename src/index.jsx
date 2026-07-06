import React from 'react';
import { createRoot } from 'react-dom/client';
import TermApp from './components/App';
import Driver from './lib/driver/Driver';
import './styles/index.scss';

// Initialize the Stellar driver
const driver = new Driver();

// Make React available globally for debugging (dev only)
if (process.env.NODE_ENV === 'development') {
    window.React = React;
    window.driver = driver;
}

// Get the root element
const rootElement = document.getElementById('app');

if (!rootElement) {
    throw new Error('Root element not found');
}

// Create root and render app
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <TermApp driver={driver} />
    </React.StrictMode>
);

// Hot Module Replacement (HMR) for development
if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        root.render(
            <React.StrictMode>
                <NextApp driver={driver} />
            </React.StrictMode>
        );
    });
}
