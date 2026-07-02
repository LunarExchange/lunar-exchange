# Lunar Exchange Setup Guide

Complete setup instructions for getting Lunar Exchange running on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20 or higher ([Download](https://nodejs.org/))
- **npm**: Version 9 or higher (comes with Node.js)
- **Git**: For version control ([Download](https://git-scm.com/))

### Verify Installation

```bash
node --version  # Should be v20.x.x or higher
npm --version   # Should be 9.x.x or higher
git --version   # Any recent version
```

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/lunarexchange/lunar-exchange.git
cd lunar-exchange
```

### 2. Install Dependencies

```bash
npm run setup
```

This will install all required dependencies including:
- React and React DOM
- Stellar SDK
- Webpack and build tools
- Testing frameworks
- Development tools

### 3. Start Development Server

```bash
npm run dev
```

The application will open automatically in your browser at `http://localhost:3000`

## 🧪 Running Tests

### Run All Tests

```bash
npm run test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test -- --coverage
```

### View Coverage Report

After running tests with coverage, open `coverage/lcov-report/index.html` in your browser.

## 🔍 Code Quality

### Linting

Check for code quality issues:

```bash
npm run lint
```

Fix auto-fixable issues:

```bash
npm run lint:fix
```

### Formatting

Check code formatting:

```bash
npm run format:check
```

Format all files:

```bash
npm run format
```

### Run All Checks

Before committing, run all validation:

```bash
npm run validate
```

This runs linting, formatting checks, and tests.

## 🏗️ Building for Production

### Create Production Build

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Analyze Bundle Size

```bash
npm run build:analyze
```

This creates a production build and opens the bundle analyzer.

### Verify Build Integrity

```bash
npm run hash
```

Generates SHA-256 hash of the build for integrity verification.

## 🌐 Network Configuration

### Using Testnet

Access testnet by adding `#testnet` or `/testnet` to the URL:

```
http://localhost:3000/#testnet
```

### Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
HORIZON_URL=https://horizon.stellar.org
TESTNET_HORIZON_URL=https://horizon-testnet.stellar.org
```

## 🛠️ Development Tools

### Hot Module Replacement (HMR)

Changes to your code will automatically reload in the browser without losing state.

### React DevTools

Install the React DevTools browser extension for better debugging:
- [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

### Redux DevTools (if using Redux)

For state inspection and time-travel debugging.

## 📚 Storybook (Component Development)

### Start Storybook

```bash
npm run storybook
```

Opens at `http://localhost:6006`

### Build Storybook

```bash
npm run build-storybook
```

## 🔧 Troubleshooting

### Port Already in Use

If port 3000 is already in use:

1. Change the port in `configs/webpack.dev.js`:
   ```js
   devServer: {
       port: 3001, // Change to desired port
   }
   ```

2. Or kill the process using port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:3000 | xargs kill -9
   ```

### Node Module Issues

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Cache Issues

Clear webpack cache:

```bash
npm run clean
```

### Build Failures

1. Ensure Node.js version is correct
2. Clear cache and reinstall dependencies
3. Check for error messages in the console
4. Verify no syntax errors in recent changes

## 📱 Mobile Development

### Testing on Mobile Devices

1. Find your local IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig | grep inet
   ```

2. Access the app from your mobile device:
   ```
   http://YOUR_LOCAL_IP:3000
   ```

3. Ensure your mobile device is on the same network

## 🔐 Security Considerations

### Development

- Never commit `.env` files with sensitive data
- Use test accounts on testnet for development
- Don't share private keys or seeds

### Production

- Enable Content Security Policy (already configured)
- Use HTTPS in production
- Regularly update dependencies
- Follow security best practices

## 📊 Performance Optimization

### Bundle Analysis

```bash
npm run build:analyze
```

### Lighthouse Audit

Use Chrome DevTools Lighthouse or:

```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

## 🤝 Getting Help

- **Documentation**: Check the `/docs` directory
- **Issues**: [GitHub Issues](https://github.com/lunarexchange/lunar-exchange/issues)
- **Discord**: [Join our community](https://discord.gg/lunar-exchange)
- **Email**: support@lunar-exchange.io

## 📝 Next Steps

1. Read the [Contributing Guide](../CONTRIBUTING.md)
2. Explore the [Architecture Documentation](./ARCHITECTURE.md)
3. Check out the [API Documentation](./API.md)
4. Join our [Discord community](https://discord.gg/lunar-exchange)

---

Happy coding! 🌙
