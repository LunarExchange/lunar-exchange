# Utility Scripts

This directory contains utility scripts for development and maintenance tasks.

## Available Scripts

### fix-eslint.js

Automated ESLint error fixing script that:
1. Runs ESLint `--fix` for auto-fixable issues
2. Applies additional manual fixes for common patterns
3. Runs Prettier for formatting
4. Reports remaining issues

**Usage**:
```bash
npm run fix-eslint
```

Or directly:
```bash
node scripts/fix-eslint.js
```

**What it fixes**:
- Arrow function parameters (adds parentheses)
- Missing alt attributes on images
- Console.log statements (comments them out)
- And all auto-fixable ESLint rules

**Note**: This script is safe to run multiple times. It only modifies files when changes are needed.

## Adding New Scripts

When adding new utility scripts:

1. Place them in this `scripts/` directory
2. Add a corresponding npm script in `package.json`
3. Make them executable: `chmod +x scripts/your-script.js`
4. Add Node shebang at the top: `#!/usr/bin/env node`
5. Document them in this README

## Future Scripts (Planned)

- `generate-icons.js` - Generate icon assets
- `analyze-bundle.js` - Bundle size analysis
- `check-deps.js` - Dependency audit
- `setup-dev.js` - Dev environment setup
