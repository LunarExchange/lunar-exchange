# Contributing to Lunar Exchange

Thank you for your interest in contributing to Lunar Exchange! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to conduct@lunar-exchange.io.

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 9
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/lunar-exchange.git
   cd lunar-exchange
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/lunarexchange/lunar-exchange.git
   ```
4. Install dependencies:
   ```bash
   npm run setup
   ```
5. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### 1. Keep Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Work on Your Feature

```bash
# Start development server
npm run dev

# Run tests in watch mode
npm run test:watch

# Check your code
npm run lint
npm run format:check
```

### 3. Before Committing

```bash
# Format code
npm run format

# Run all checks
npm run validate
```

## Pull Request Process

### 1. Prepare Your PR

- Update documentation if needed
- Add tests for new features
- Ensure all tests pass
- Update CHANGELOG.md (if applicable)

### 2. Create Pull Request

- Push to your fork
- Create a PR from your branch to `upstream/main`
- Fill out the PR template completely
- Link related issues

### 3. PR Title Format

```
type(scope): brief description

Examples:
feat(trading): add limit order functionality
fix(wallet): resolve ledger connection issue
docs(readme): update installation instructions
test(exchange): add integration tests for order book
```

### 4. PR Requirements

- ✅ All CI checks pass
- ✅ Code review approved
- ✅ No merge conflicts
- ✅ Branch is up to date with main

## Coding Standards

### JavaScript/JSX

- Follow Airbnb style guide
- Use ESLint and Prettier
- Write functional components with hooks
- Use PropTypes for type checking

### File Naming

- Components: `PascalCase.jsx` (e.g., `TradingView.jsx`)
- Utilities: `camelCase.js` (e.g., `formatPrice.js`)
- Tests: `ComponentName.test.jsx`
- Styles: `ComponentName.scss`

### Code Organization

```
src/
├── components/          # React components
│   └── ComponentName/
│       ├── ComponentName.jsx
│       ├── ComponentName.scss
│       ├── ComponentName.test.jsx
│       └── index.js
├── lib/                # Core libraries
│   ├── api/            # API integrations
│   ├── helpers/        # Utility functions
│   └── hooks/          # Custom hooks
└── assets/             # Static assets
```

## Testing Guidelines

### Unit Tests

- Test component behavior, not implementation
- Use React Testing Library
- Aim for 70%+ coverage

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('clicking button shows modal', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    
    await user.click(screen.getByRole('button', { name: /open/i }));
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
});
```

### Integration Tests

- Test component interactions
- Mock external dependencies
- Test user workflows

## Commit Message Guidelines

### Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(wallet): add WalletConnect v2 support

Implement WalletConnect v2 protocol for mobile wallet connections.
Includes QR code scanning and deep linking.

Closes #123
```

```
fix(trading): prevent duplicate order submissions

Add debouncing to order submission handler to prevent
accidental duplicate orders when users double-click.

Fixes #456
```

## Reporting Bugs

### Before Submitting

- Check existing issues
- Try the latest version
- Gather relevant information

### Bug Report Template

```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome 120
- OS: macOS 14
- Version: 1.0.0

## Screenshots
If applicable
```

## Feature Requests

We welcome feature requests! Please:

1. Check if the feature already exists
2. Explain the use case
3. Describe the proposed solution
4. Consider implementation complexity

## Questions?

- Join our [Discord community](https://discord.gg/lunar-exchange)
- Email: dev@lunar-exchange.io
- Check our [FAQ](https://lunar-exchange.io/faq)

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 License.

---

Thank you for contributing to Lunar Exchange! 🌙
