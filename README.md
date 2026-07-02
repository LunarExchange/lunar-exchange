# 🌙 Lunar Exchange

[![Complete CI](https://github.com/LunarExchange/lunar-exchange/actions/workflows/complete-ci.yml/badge.svg)](https://github.com/LunarExchange/lunar-exchange/actions/workflows/complete-ci.yml)
[![Frontend CI](https://github.com/LunarExchange/lunar-exchange/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/LunarExchange/lunar-exchange/actions/workflows/frontend-ci.yml)
[![Deployment](https://github.com/LunarExchange/lunar-exchange/actions/workflows/full-deployment.yml/badge.svg)](https://github.com/LunarExchange/lunar-exchange/actions/workflows/full-deployment.yml)
[![Monitoring](https://github.com/LunarExchange/lunar-exchange/actions/workflows/monitoring.yml/badge.svg)](https://github.com/LunarExchange/lunar-exchange/actions/workflows/monitoring.yml)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node Version](https://img.shields.io/badge/node-%3E%3D24-brightgreen)](https://nodejs.org)
[![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)](https://github.com/lunarexchange/lunar-exchange)

> **A modern, secure, and intuitive trading platform for the Stellar blockchain network**

[Website](https://lunar-exchange.io) • [API Documentation](https://api.lunar-exchange.io) • [Community](https://discord.gg/lunar-exchange)

---

## 🚀 Overview

Lunar Exchange is a next-generation web-based trading client for the Stellar network. Built with modern web technologies and best practices, it provides a seamless and secure trading experience for users of all skill levels.

### ✨ Key Features

- 🔐 **Multi-Wallet Support** - Ledger, Trezor, Freighter, WalletConnect
- 📊 **Advanced Trading** - Real-time charts, order books, trading history
- 💱 **Asset Swaps** - Simple and fast asset exchanges
- 🌐 **Multi-Network** - Support for mainnet, testnet, and custom networks
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🔒 **Security First** - Client-side signing, no private key storage
- ⚡ **High Performance** - Optimized for speed and reliability
- 🎨 **Modern UI/UX** - Clean, intuitive interface

---

## 🏗️ Architecture

### Technology Stack

- **Frontend Framework**: React 18
- **State Management**: Zustand
- **Routing**: React Router v6
- **Styling**: SCSS with modern CSS features
- **Charts**: D3.js + Lightweight Charts
- **Build Tool**: Webpack 5
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions

### Project Structure

```
lunar-exchange/
├── .github/              # GitHub Actions workflows
├── configs/              # Webpack configurations
├── src/
│   ├── components/       # React components
│   ├── lib/              # Core libraries
│   │   ├── api/          # API integrations
│   │   ├── constants/    # App constants
│   │   ├── driver/       # Stellar SDK driver
│   │   ├── helpers/      # Utility functions
│   │   ├── hooks/        # Custom React hooks
│   │   └── store/        # State management
│   ├── assets/           # Static assets
│   ├── styles/           # Global styles
│   └── index.html        # HTML template
├── tests/                # Test files
├── docs/                 # Documentation
└── scripts/              # Build and utility scripts
```

---

## 🛠️ Development

### Prerequisites

- Node.js >= 20
- npm >= 9

### Quick Start

```bash
# Clone the repository
git clone https://github.com/lunarexchange/lunar-exchange.git
cd lunar-exchange

# Install dependencies
npm run setup

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ci` | Run tests for CI environment |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run validate` | Run all checks (lint, format, test) |
| `npm run storybook` | Start Storybook for component development |

---

## 🧪 Testing

We maintain high test coverage with comprehensive unit and integration tests.

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test -- --coverage

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test -- ComponentName.test.jsx
```

---

## 🚀 Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Outputs to dist/ directory with:
# - Minified JavaScript and CSS
# - Optimized images
# - Single index.html file
# - SHA-256 hash for integrity verification
```

### Verify Build Integrity

```bash
npm run hash
```

---

## 🌐 Network Configuration

### Using Testnet

Add `#testnet` or `/testnet` to the URL:

```
https://lunar-exchange.io/#testnet
```

To exit testnet mode, refresh the page without the testnet parameter.

### Custom Network

Configure custom Stellar network in the settings panel.

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Quality

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting PR

---

## 📚 Documentation

- [User Guide](docs/USER_GUIDE.md)
- [API Documentation](docs/API.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Security Best Practices](docs/SECURITY.md)
- [Wallet Integration Guide](docs/WALLET_INTEGRATION.md)

---

## 🔒 Security

Security is our top priority. Lunar Exchange:

- Never stores private keys
- Performs all signing client-side
- Uses secure communication protocols
- Regularly audits dependencies
- Implements Content Security Policy (CSP)

**Report Security Issues**: security@lunar-exchange.io

---

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

Built on the shoulders of giants:

- [Stellar Development Foundation](https://stellar.org)
- Original inspiration from StellarTerm
- The amazing Stellar community

---

## 📞 Support

- **Website**: [lunar-exchange.io](https://lunar-exchange.io)
- **Twitter**: [@LunarExchange](https://twitter.com/lunarexchange)
- **Discord**: [Join our community](https://discord.gg/lunar-exchange)
- **Email**: support@lunar-exchange.io

---

<div align="center">

Made with ❤️ by the Lunar Exchange Team

[⬆ back to top](#-lunar-exchange)

</div>
