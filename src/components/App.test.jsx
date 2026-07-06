import React from 'react';
import { render, screen } from '@testing-library/react';
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

// Mock @stellar-broker/client
jest.mock('@stellar-broker/client', () => ({
    Mediator: {
        hasObsoleteMediators: jest.fn(() => false),
    },
}));

// Mock browser support helpers
jest.mock('../lib/helpers/BrowserSupport', () => ({
    isIE: jest.fn(() => false),
    isEdge: jest.fn(() => false),
}));

// Mock is-electron
jest.mock('is-electron', () => jest.fn(() => false));

// Mock favicon utils
jest.mock('../lib/helpers/faviconUtils', () => jest.fn());

describe('LunarExchangeApp', () => {
    let mockDriver;
    let unsubscribeSession;
    let unsubscribeTicker;

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();
        
        // Create unsubscribe functions
        unsubscribeSession = jest.fn();
        unsubscribeTicker = jest.fn();

        // Create a mock driver instance with all required properties
        mockDriver = {
            session: {
                event: {
                    sub: jest.fn(() => unsubscribeSession),
                },
                state: 'OUT',
                account: {
                    accountId: jest.fn(() => 'test-account-id'),
                },
            },
            ticker: {
                event: {
                    sub: jest.fn((callback) => {
                        // Call callback synchronously for predictable tests
                        if (typeof callback === 'function') {
                            callback();
                        }
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

    test('renders without crashing', () => {
        const { container } = render(<LunarExchangeApp d={mockDriver} />);
        expect(container).toBeInTheDocument();
    });

    test('renders header component', () => {
        render(<LunarExchangeApp d={mockDriver} />);
        expect(screen.getByText('Header')).toBeInTheDocument();
    });

    test('renders footer component', () => {
        render(<LunarExchangeApp d={mockDriver} />);
        expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    test('subscribes to session events', () => {
        render(<LunarExchangeApp d={mockDriver} />);
        expect(mockDriver.session.event.sub).toHaveBeenCalled();
    });

    test('subscribes to ticker events', () => {
        render(<LunarExchangeApp d={mockDriver} />);
        expect(mockDriver.ticker.event.sub).toHaveBeenCalled();
    });

    test('renders global modal', () => {
        render(<LunarExchangeApp d={mockDriver} />);
        expect(screen.getByText('Global Modal')).toBeInTheDocument();
    });

    test('renders toast template', () => {
        render(<LunarExchangeApp d={mockDriver} />);
        expect(screen.getByText('Toast Template')).toBeInTheDocument();
    });

    test('cleans up subscriptions on unmount', () => {
        const { unmount } = render(<LunarExchangeApp d={mockDriver} />);
        
        // Verify subscriptions were made
        expect(mockDriver.session.event.sub).toHaveBeenCalled();
        expect(mockDriver.ticker.event.sub).toHaveBeenCalled();
        
        // Unmount
        unmount();
        
        // Verify cleanup was called
        expect(unsubscribeSession).toHaveBeenCalled();
        expect(unsubscribeTicker).toHaveBeenCalled();
    });
});

