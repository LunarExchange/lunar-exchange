import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LunarExchangeApp from './App';
import Driver from '../lib/driver/Driver';

// Mock all the lazy-loaded components
jest.mock('./Exchange/Exchange', () => ({
    __esModule: true,
    default: () => <div>Exchange Page</div>,
}));

jest.mock('./HomePage/HomePage', () => ({
    __esModule: true,
    default: () => <div>Home Page</div>,
}));

jest.mock('./Download/Download', () => ({
    __esModule: true,
    default: () => <div>Download Page</div>,
}));

jest.mock('./TermsOfUse/TermsOfUse', () => ({
    __esModule: true,
    default: () => <div>Terms of Use Page</div>,
}));

jest.mock('./NotFound/NotFound', () => ({
    __esModule: true,
    default: () => <div>Not Found Page</div>,
}));

jest.mock('./Swap/Swap', () => ({
    __esModule: true,
    default: () => <div>Swap Page</div>,
}));

jest.mock('./DiscoWidget/WidgetIframe', () => ({
    __esModule: true,
    default: () => <div>Widget Page</div>,
}));

jest.mock('./Session/Session', () => ({
    __esModule: true,
    default: () => <div>Session Page</div>,
}));

jest.mock('./Markets/Markets', () => ({
    __esModule: true,
    default: () => <div>Markets Page</div>,
}));

jest.mock('./PrivacyPolicy/PrivacyPolicy', () => ({
    __esModule: true,
    default: () => <div>Privacy Policy Page</div>,
}));

jest.mock('./TestNetwork/TestNetwork', () => ({
    __esModule: true,
    default: () => <div>Test Network Page</div>,
}));

jest.mock('./ReloadToTestnet/ReloadToTestnet', () => ({
    __esModule: true,
    default: () => <div>Reload To Testnet Page</div>,
}));

jest.mock('./GlobalModal/GlobalModal', () => ({
    __esModule: true,
    default: () => <div>Global Modal</div>,
}));

jest.mock('./ToastTemplate/ToastTemplate', () => ({
    __esModule: true,
    default: () => <div>Toast Template</div>,
}));

jest.mock('./Header/Header', () => ({
    __esModule: true,
    default: () => <div>Header</div>,
}));

jest.mock('./Footer/Footer', () => ({
    __esModule: true,
    default: () => <div>Footer</div>,
}));

jest.mock('./AppLoading/AppLoading', () => ({
    __esModule: true,
    default: ({ text }) => <div>{text}</div>,
}));

jest.mock('./Common/ErrorBoundary/ErrorBoundary', () => ({
    __esModule: true,
    default: ({ children }) => <div>{children}</div>,
}));

// Mock the Driver class
jest.mock('../lib/driver/Driver');

describe('LunarExchangeApp', () => {
    let mockDriver;
    let unsubscribeSession;
    let unsubscribeTicker;

    beforeEach(() => {
        // Create unsubscribe functions
        unsubscribeSession = jest.fn();
        unsubscribeTicker = jest.fn();

        // Create a mock driver instance
        mockDriver = {
            session: {
                event: {
                    sub: jest.fn(() => unsubscribeSession),
                },
                state: 'OUT',
            },
            ticker: {
                event: {
                    sub: jest.fn((callback) => {
                        // Call callback immediately for faster tests
                        setImmediate(() => callback());
                        return unsubscribeTicker;
                    }),
                },
            },
            modal: {
                handlers: {
                    cancel: jest.fn(),
                    activate: jest.fn(),
                },
            },
            toastService: {
                clearToasts: jest.fn(),
                success: jest.fn(),
                error: jest.fn(),
            },
            walletConnectService: {
                restoreConnectionIfNeeded: jest.fn(),
                clearClient: jest.fn(),
            },
            isOnline: true,
            Server: {
                isTestnet: false,
            },
        };

        Driver.mockImplementation(() => mockDriver);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', () => {
        render(<LunarExchangeApp d={mockDriver} />);
        
        expect(screen.getByText(/Loading assets and balances/i)).toBeInTheDocument();
    });

    test('renders header and footer', () => {
        render(<LunarExchangeApp d={mockDriver} />);
        
        expect(screen.getByText('Header')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    test('renders home page after ticker loads', async () => {
        render(<LunarExchangeApp d={mockDriver} />);
        
        // Wait for ticker to load and component to update
        await waitFor(() => {
            expect(screen.getByText('Home Page')).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    test('subscribes to session and ticker events', () => {
        render(<LunarExchangeApp d={mockDriver} />);
        
        expect(mockDriver.session.event.sub).toHaveBeenCalled();
        expect(mockDriver.ticker.event.sub).toHaveBeenCalled();
    });

    test('handles online event correctly', async () => {
        render(<LunarExchangeApp d={mockDriver} />);
        
        // Wait a bit for component to fully mount
        await waitFor(() => {
            expect(mockDriver.ticker.event.sub).toHaveBeenCalled();
        });

        // Simulate online event
        const onlineEvent = new Event('online');
        window.dispatchEvent(onlineEvent);
        
        await waitFor(() => {
            expect(mockDriver.walletConnectService.restoreConnectionIfNeeded).toHaveBeenCalled();
            expect(mockDriver.toastService.success).toHaveBeenCalledWith(
                'Connection restored',
                'Internet connection has been restored'
            );
        });
    });

    test('handles offline event correctly', async () => {
        render(<LunarExchangeApp d={mockDriver} />);
        
        // Wait a bit for component to fully mount
        await waitFor(() => {
            expect(mockDriver.ticker.event.sub).toHaveBeenCalled();
        });

        // Simulate offline event
        const offlineEvent = new Event('offline');
        window.dispatchEvent(offlineEvent);
        
        await waitFor(() => {
            expect(mockDriver.walletConnectService.clearClient).toHaveBeenCalled();
            expect(mockDriver.toastService.error).toHaveBeenCalledWith(
                'No connection',
                'Internet connection appears to be offline'
            );
        });
    });

    test('renders global modal and toast template', () => {
        render(<LunarExchangeApp d={mockDriver} />);
        
        expect(screen.getByText('Global Modal')).toBeInTheDocument();
        expect(screen.getByText('Toast Template')).toBeInTheDocument();
    });

    test('cleans up event listeners on unmount', () => {
        const { unmount } = render(<LunarExchangeApp d={mockDriver} />);
        
        // Component should have subscribed
        expect(mockDriver.session.event.sub).toHaveBeenCalled();
        expect(mockDriver.ticker.event.sub).toHaveBeenCalled();
        
        // Unmount the component
        unmount();
        
        // Verify unsubscribe functions were called
        expect(unsubscribeSession).toHaveBeenCalled();
        expect(unsubscribeTicker).toHaveBeenCalled();
    });
});

