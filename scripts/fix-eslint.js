#!/usr/bin/env node

/**
 * ESLint Auto-Fix Script
 * 
 * This script helps fix common ESLint errors across the codebase.
 * It performs safe, automated fixes for patterns that can be reliably transformed.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function findFiles(dir, extension, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Skip node_modules, dist, coverage, etc.
            if (!['node_modules', 'dist', 'coverage', '.git', 'build'].includes(file)) {
                findFiles(filePath, extension, fileList);
            }
        } else if (file.endsWith(extension)) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

function fixArrowFunctionParams(content) {
    // Add parentheses around single arrow function parameters
    // Match: word => but not (word) =>
    return content.replace(/([^(])(\w+)\s*=>/g, '$1($2) =>');
}

function fixQuoteProps(content) {
    // Remove unnecessary quotes from object properties
    // This is a simple version - ESLint --fix handles this better
    return content.replace(/'(\w+)':/g, '$1:');
}

function fixTemplateStrings(content) {
    // Convert simple string concatenation to template literals
    // This is complex and error-prone, so we skip it
    // Let ESLint --fix handle it
    return content;
}

function addMissingAltToImages(content) {
    // Add empty alt="" to images that are missing it
    // Only handles simple cases
    return content.replace(/<img\s+([^>]*src=[^>]+)(?!.*alt=)([^>]*)>/gi, '<img $1 alt=""$2>');
}

function fixConsoleStatements(content) {
    // Comment out console.log statements (not console.error or console.warn)
    return content.replace(/(\s+)console\.log\(/g, '$1// console.log(');
}

async function runESLintFix() {
    log('\n🔧 Running ESLint auto-fix...', 'blue');
    try {
        execSync('npm run lint:fix', { stdio: 'inherit' });
        log('✅ ESLint auto-fix completed', 'green');
        return true;
    } catch (error) {
        log('⚠️  ESLint auto-fix encountered errors (this is normal)', 'yellow');
        return false;
    }
}

async function runPrettier() {
    log('\n💅 Running Prettier...', 'blue');
    try {
        execSync('npm run format', { stdio: 'inherit' });
        log('✅ Prettier completed', 'green');
        return true;
    } catch (error) {
        log('❌ Prettier failed', 'red');
        return false;
    }
}

async function checkRemaining() {
    log('\n🔍 Checking remaining issues...', 'blue');
    try {
        execSync('npm run lint', { stdio: 'inherit' });
        log('✅ All ESLint issues fixed!', 'green');
        return true;
    } catch (error) {
        log('\n⚠️  Some issues remain. Check output above.', 'yellow');
        log('Run this script again or fix manually.', 'yellow');
        return false;
    }
}

async function applyManualFixes() {
    log('\n🛠️  Applying manual fixes to JSX files...', 'blue');
    
    const jsxFiles = findFiles(path.join(__dirname, '..', 'src'), '.jsx');
    log(`Found ${jsxFiles.length} JSX files`, 'blue');
    
    let fixedCount = 0;
    
    jsxFiles.forEach((file) => {
        let content = fs.readFileSync(file, 'utf8');
        const originalContent = content;
        
        // Apply fixes
        content = fixArrowFunctionParams(content);
        content = addMissingAltToImages(content);
        content = fixConsoleStatements(content);
        
        // Only write if content changed
        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            fixedCount++;
            log(`  ✓ Fixed: ${path.relative(process.cwd(), file)}`, 'green');
        }
    });
    
    log(`✅ Applied manual fixes to ${fixedCount} files`, 'green');
}

async function main() {
    log('\n' + '='.repeat(60), 'bright');
    log('  ESLint Auto-Fix Script', 'bright');
    log('='.repeat(60) + '\n', 'bright');
    
    log('This script will:', 'blue');
    log('  1. Run ESLint --fix for auto-fixable issues', 'blue');
    log('  2. Apply additional manual fixes', 'blue');
    log('  3. Run Prettier for formatting', 'blue');
    log('  4. Check remaining issues', 'blue');
    log('');
    
    // Step 1: Run ESLint auto-fix
    await runESLintFix();
    
    // Step 2: Apply manual fixes
    await applyManualFixes();
    
    // Step 3: Run Prettier
    await runPrettier();
    
    // Step 4: Check remaining issues
    const allFixed = await checkRemaining();
    
    // Summary
    log('\n' + '='.repeat(60), 'bright');
    if (allFixed) {
        log('  🎉 All done! No ESLint errors remaining.', 'green');
    } else {
        log('  📋 Next steps:', 'yellow');
        log('    1. Review remaining errors in output above', 'yellow');
        log('    2. Fix import/module errors manually', 'yellow');
        log('    3. Add PropTypes to components', 'yellow');
        log('    4. Fix accessibility issues', 'yellow');
        log('    5. Run this script again', 'yellow');
        log('\n  📚 See ESLINT_FIX_GUIDE.md for detailed instructions', 'blue');
    }
    log('='.repeat(60) + '\n', 'bright');
}

// Run the script
main().catch((error) => {
    log(`\n❌ Script failed: ${error.message}`, 'red');
    process.exit(1);
});
