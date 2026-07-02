# 🚀 CI/CD Workflows Documentation

This directory contains comprehensive CI/CD workflows for the Lunar Exchange project.

## 📋 Workflow Overview

### 🎯 Complete CI Pipeline (`complete-ci.yml`)
**Triggers:** Push, Pull Request, Schedule, Manual
**Purpose:** Main CI pipeline orchestrating all checks

**Stages:**
1. 🎬 Initialize - Detect project structure
2. 🚦 Quality Gate - Linting, formatting, tests
3. 🔒 Security Scan - Vulnerability scanning
4. 🏗️ Build Verification - Multi-Node.js version builds
5. ⚡ Performance Testing - Bundle analysis
6. 🌟 Stellar Integration - SDK verification
7. 📊 Pipeline Report - Comprehensive summary

---

### 🎨 Frontend CI (`frontend-ci.yml`)
**Triggers:** Push to `src/`, `configs/`, `package.json`
**Purpose:** Frontend-specific quality and build checks

**Jobs:**
- 📦 Setup & Cache - Dependency caching
- 🔍 Lint Code - ESLint + Prettier
- 🧪 Test Suite - Unit & integration tests (Node 24 & 25)
- 🏗️ Build Frontend - Production bundle
- 📊 Bundle Analysis - Size analysis on PRs

**Artifacts:** 
- `frontend-dist-{sha}` - 7 days retention

---

### 📜 Smart Contract CI (`smart-contract-ci.yml`)
**Triggers:** Push to `contracts/`, `scripts/`
**Purpose:** Stellar blockchain integration validation

**Jobs:**
- 🚀 Setup Stellar Environment
- ✅ Validate Stellar Integration
- 🔒 Security Audit
- 🌐 Testnet Integration

**Note:** This project uses Stellar SDK for client-side interactions, not Soroban smart contracts.

---

### 🚀 Full Stack Deployment (`full-deployment.yml`)
**Triggers:** Push to `main`, Tags `v*.*.*`, Manual
**Purpose:** Complete production deployment pipeline

**Stages:**
1. 🔍 Pre-Deployment Checks
2. 🏗️ Build Complete Stack
3. 🌐 Deploy Frontend (GitHub Pages)
4. 📝 Create Release (on tags)
5. ✅ Verify Deployment
6. 📢 Notify Deployment

**Environments:**
- Production (default)
- Staging
- Preview

**Deployment URL:** https://lunar-exchange.io

---

### 📊 Monitoring (`monitoring.yml`)
**Triggers:** Schedule (every 6 hours), Manual, Deployment Status
**Purpose:** Continuous health monitoring

**Checks:**
- 🏥 Health Check - Site availability
- 🚦 Lighthouse Audit - Performance metrics
- 📦 Dependency Health - Outdated packages
- ⚡ Performance Monitoring - Load times
- 🌐 Availability Check - Multiple endpoints

---

### 🔍 Dependency Review (`dependency-review.yml`)
**Triggers:** Pull Requests
**Purpose:** Automated dependency vulnerability detection

---

### 🚀 Deploy (`deploy.yml`)
**Triggers:** Push to `main`, Manual
**Purpose:** Quick production deployment
**Target:** GitHub Pages

---

## 🎮 Manual Workflow Triggers

### Run Complete CI Pipeline
```bash
gh workflow run complete-ci.yml
```

### Deploy to Production
```bash
gh workflow run full-deployment.yml
```

### Deploy to Staging
```bash
gh workflow run full-deployment.yml -f environment=staging
```

### Run Health Check
```bash
gh workflow run monitoring.yml
```

---

## 🔐 Required Secrets

### Optional Secrets
- `CODECOV_TOKEN` - Code coverage reporting
- `SLACK_WEBHOOK` - Deployment notifications
- `SNYK_TOKEN` - Advanced security scanning

### Automatically Available
- `GITHUB_TOKEN` - Provided by GitHub Actions

---

## 📦 Artifacts

### Build Artifacts
- **Name:** `frontend-dist-{sha}`
- **Retention:** 7 days
- **Contents:** Production build (`dist/`)

### Deployment Artifacts
- **Name:** `deployment-bundle-{sha}`
- **Retention:** 30 days
- **Contents:** Full deployment package

---

## 🎯 Workflow Status Badges

Add these to your README.md:

```markdown
[![Complete CI](https://github.com/LunarExchange/lunar-exchange/actions/workflows/complete-ci.yml/badge.svg)](https://github.com/LunarExchange/lunar-exchange/actions/workflows/complete-ci.yml)
[![Frontend CI](https://github.com/LunarExchange/lunar-exchange/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/LunarExchange/lunar-exchange/actions/workflows/frontend-ci.yml)
[![Deployment](https://github.com/LunarExchange/lunar-exchange/actions/workflows/full-deployment.yml/badge.svg)](https://github.com/LunarExchange/lunar-exchange/actions/workflows/full-deployment.yml)
[![Monitoring](https://github.com/LunarExchange/lunar-exchange/actions/workflows/monitoring.yml/badge.svg)](https://github.com/LunarExchange/lunar-exchange/actions/workflows/monitoring.yml)
```

---

## 🔄 Workflow Dependencies

```
complete-ci.yml
├── quality-gate
├── security-scan
├── build-verification (Node 24, 25)
├── performance-test
└── stellar-integration

frontend-ci.yml
├── setup (caching)
├── lint
├── test (Node 24, 25)
├── build
└── analyze (PRs only)

full-deployment.yml
├── pre-deploy
├── build-all
├── deploy-frontend
├── create-release (tags only)
├── verify-deployment
└── notify
```

---

## 🚨 Failure Handling

### Automatic Retries
- Network failures: Automatic retry
- Transient errors: Continue on error flag

### Manual Intervention
- Build failures: Check logs, fix issues, re-push
- Deployment failures: Manual workflow dispatch
- Test failures: Review test output, fix code

---

## 📈 Performance Metrics

### Build Times (Approximate)
- Complete CI: 8-12 minutes
- Frontend CI: 5-8 minutes
- Smart Contract CI: 2-3 minutes
- Deployment: 3-5 minutes
- Monitoring: 5-10 minutes

### Resource Usage
- Node.js version: 24 (latest stable)
- Runner: ubuntu-latest
- Concurrent workflows: Managed by concurrency groups

---

## 🛠️ Maintenance

### Weekly Tasks
- Review dependency updates
- Check for outdated actions
- Monitor workflow performance

### Monthly Tasks
- Update Node.js versions
- Review and optimize caching
- Update documentation

---

## 📞 Support

For workflow issues:
1. Check [GitHub Actions logs](https://github.com/LunarExchange/lunar-exchange/actions)
2. Review [workflow syntax](https://docs.github.com/actions)
3. Open an issue with workflow logs

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Stellar SDK Documentation](https://stellar.github.io/js-stellar-sdk/)
- [Deployment Best Practices](https://docs.github.com/pages)
- [Security Best Practices](https://docs.github.com/code-security)

---

**Last Updated:** July 2, 2026
**Maintained by:** Lunar Exchange Team
