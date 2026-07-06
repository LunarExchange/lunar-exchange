# ESLint Error Fixing Guide

## Overview
This document provides a systematic approach to fixing the 2390 ESLint problems (2057 errors, 333 warnings) in the Lunar Exchange codebase.

## Quick Fix Commands

### 1. Auto-fix 278 fixable errors
```bash
npm run lint:fix
```

### 2. Run lint to see remaining errors
```bash
npm run lint
```

## Error Categories & Solutions

### Category 1: Import/Module Issues

#### Missing Module Imports
**Error**: `Module not found` or `Unable to resolve path to module`

**Common Fixes**:
- Verify file paths and extensions (.js vs .jsx)
- Check if imported files exist
- Ensure webpack aliases are configured correctly in .eslintrc.json

**Example Fix**:
```javascript
// Bad
import Component from './Component'; // if file is Component.jsx

// Good
import Component from './Component.jsx';
// OR configure webpack alias in .eslintrc.json
```

### Category 2: React/JSX Issues

#### 2.1 Prop Types Warnings
**Error**: `PropTypes are not defined` or `is missing in props validation`

**Fix**: Add PropTypes to all components
```javascript
import PropTypes from 'prop-types';

const MyComponent = ({ name, age, onClick }) => (
    <div onClick={onClick}>{name} - {age}</div>
);

MyComponent.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    onClick: PropTypes.func,
};

MyComponent.defaultProps = {
    onClick: null,
};

export default MyComponent;
```

#### 2.2 Arrow Function Components
**Error**: `Component should be written as arrow function`

**Fix**: Convert function declarations to arrow functions
```javascript
// Bad
function MyComponent(props) {
    return <div>{props.text}</div>;
}

// Good
const MyComponent = (props) => <div>{props.text}</div>;

// Also Good (with body)
const MyComponent = (props) => {
    const { text } = props;
    return <div>{text}</div>;
};
```

#### 2.3 Props Destructuring
**Error**: `Must use destructuring props assignment`

**Fix**: Destructure props in function parameters or at the top
```javascript
// Bad
const MyComponent = (props) => {
    return <div>{props.name}</div>;
};

// Good
const MyComponent = ({ name }) => <div>{name}</div>;

// Also Good
const MyComponent = (props) => {
    const { name } = props;
    return <div>{name}</div>;
};
```

#### 2.4 React Hooks Rules
**Error**: `React Hook "useState" is called conditionally` or similar

**Fix**: Always call hooks at the top level
```javascript
// Bad
const MyComponent = ({ show }) => {
    if (show) {
        const [value, setValue] = useState('');
    }
    return <div />;
};

// Good
const MyComponent = ({ show }) => {
    const [value, setValue] = useState('');
    
    if (!show) return null;
    
    return <div>{value}</div>;
};
```

### Category 3: Accessibility Issues (jsx-a11y)

#### 3.1 Click Handlers on Non-Interactive Elements
**Error**: `Visible, non-interactive elements with click handlers must have keyboard handler`

**Fix**: Add onKeyDown/onKeyPress or use button/a element
```javascript
// Bad
<div onClick={() => handleClick()}>Click me</div>

// Good - Option 1: Add keyboard handler
<div 
    onClick={() => handleClick()}
    onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    role="button"
    tabIndex={0}
>
    Click me
</div>

// Good - Option 2: Use button element
<button onClick={() => handleClick()}>Click me</button>
```

#### 3.2 Images Without Alt Text
**Error**: `img elements must have an alt prop`

**Fix**: Always add alt attribute
```javascript
// Bad
<img src={logo} />

// Good
<img src={logo} alt="Company Logo" />

// Good (decorative image)
<img src={icon} alt="" />
```

#### 3.3 Anchor Elements
**Error**: `The href attribute is required for an anchor to be keyboard accessible`

**Fix**: Add href or use button instead
```javascript
// Bad
<a onClick={() => handleClick()}>Click</a>

// Good - if it's a link
<a href="/path" onClick={() => handleClick()}>Click</a>

// Good - if it's an action, use button
<button onClick={() => handleClick()}>Click</button>
```

### Category 4: Code Style Issues

#### 4.1 prefer-const
**Error**: `'variable' is never reassigned. Use 'const' instead`

**Fix**: Use const for variables that are never reassigned
```javascript
// Bad
let name = 'John';
console.log(name);

// Good
const name = 'John';
console.log(name);
```

#### 4.2 no-else-return
**Error**: `Unnecessary 'else' after 'return'`

**Fix**: Remove unnecessary else blocks
```javascript
// Bad
if (condition) {
    return true;
} else {
    return false;
}

// Good
if (condition) {
    return true;
}
return false;
```

#### 4.3 Arrow Function Implicit Returns
**Error**: Various arrow function style issues

**Fix**: Use implicit returns for simple expressions
```javascript
// Bad
const double = (x) => {
    return x * 2;
};

// Good
const double = (x) => x * 2;

// Bad (needs parentheses for object)
const makePerson = (name) => { name: name };

// Good
const makePerson = (name) => ({ name });
```

#### 4.4 Object Shorthand
**Error**: `Expected property shorthand`

**Fix**: Use ES6 object shorthand
```javascript
// Bad
const obj = { name: name, age: age };

// Good
const obj = { name, age };
```

#### 4.5 Template Literals
**Error**: `Unexpected string concatenation`

**Fix**: Use template literals instead of concatenation
```javascript
// Bad
const message = 'Hello ' + name + '!';

// Good
const message = `Hello ${name}!`;
```

### Category 5: Security & Best Practices

#### 5.1 no-unused-vars
**Error**: `'variable' is defined but never used`

**Fix**: Remove unused variables or prefix with underscore if intentional
```javascript
// Bad
const MyComponent = (props, context) => {
    return <div>{props.name}</div>;
};

// Good - remove unused param
const MyComponent = (props) => <div>{props.name}</div>;

// Good - if you need to keep it for API
const MyComponent = (props, _context) => <div>{props.name}</div>;
```

#### 5.2 no-console
**Error**: `Unexpected console statement`

**Fix**: Use console.warn or console.error (allowed), or remove
```javascript
// Bad
console.log('Debug info');

// Good (for errors)
console.error('Error occurred:', error);

// Good (for warnings)
console.warn('Deprecated function');
```

## Systematic Fixing Approach

### Step 1: Run Auto-Fix
```bash
npm run lint:fix
```
This will fix 278 errors automatically (prefer-const, arrow functions, etc.)

### Step 2: Fix Import Errors
Focus on files with module resolution issues:
- Check webpack config files
- Verify all imported files exist
- Add missing file extensions if needed

### Step 3: Add PropTypes
- Go through each component
- Add PropTypes for all props
- Add defaultProps for optional props

### Step 4: Fix Accessibility
- Add keyboard handlers to clickable divs
- Add alt text to all images
- Ensure interactive elements are semantic (buttons, links)

### Step 5: Clean Up Code Style
- Remove unnecessary else blocks
- Use template literals
- Apply object shorthand
- Remove unused variables

### Step 6: Verify
```bash
npm run lint
npm test
```

## File-by-File Priority

### High Priority (Core Files)
1. `src/index.jsx` - Entry point
2. `src/components/App.jsx` - Main app component
3. `configs/webpack.*.js` - Build configuration

### Medium Priority (Common Components)
- All files in `src/components/Common/`
- All files in `src/lib/`

### Lower Priority (Page Components)
- Individual page components
- Modal components
- Feature-specific components

## Testing After Fixes

After fixing errors, run:
```bash
# 1. Lint
npm run lint

# 2. Build
npm run build

# 3. Test
npm test

# 4. Type check (if applicable)
npm run type-check
```

## Notes

- ESLint config uses Airbnb style guide + Prettier
- React components should use arrow function syntax
- PropTypes warnings can be addressed incrementally
- Accessibility issues should be prioritized for compliance
- Some errors may require refactoring (discuss with team first)

## Common Patterns to Search & Replace

Use these regex patterns to find and fix issues:

1. **Find arrow functions without parentheses around single params**:
   - Search: `(\w+) =>`
   - Replace: `($1) =>`

2. **Find console.log statements**:
   - Search: `console\.log\(`

3. **Find unused variables**:
   - Run: `npm run lint` and look for "is defined but never used"

4. **Find missing PropTypes**:
   - Run: `npm run lint` and look for "is missing in props validation"

## Quick Reference - ESLint Rules

| Rule | Fix |
|------|-----|
| `prefer-const` | Use `const` instead of `let` |
| `no-else-return` | Remove `else` after `return` |
| `react/prop-types` | Add PropTypes definition |
| `react/require-default-props` | Add defaultProps |
| `jsx-a11y/click-events-have-key-events` | Add onKeyDown handler |
| `jsx-a11y/no-noninteractive-element-interactions` | Use button/a tags |
| `jsx-a11y/alt-text` | Add alt="" to images |
| `import/no-unresolved` | Fix import paths |
| `no-unused-vars` | Remove or use variables |
| `prefer-template` | Use template literals |

## Conclusion

Fixing these ESLint errors will:
- Improve code quality and maintainability
- Ensure accessibility compliance
- Follow React best practices
- Enable successful CI/CD pipeline execution

Start with auto-fix, then tackle categories systematically. Test frequently to catch breaking changes early.
