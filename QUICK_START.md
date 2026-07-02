# 🚀 Quick Start Guide

Get Lunar Exchange up and running in 5 minutes!

## Prerequisites Check

```bash
node --version   # Should show v20.x.x or higher
npm --version    # Should show 9.x.x or higher
```

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/)

## Installation (One Command)

```bash
cd lunar-exchange && npm install
```

## Start Development Server

```bash
npm run dev
```

Your browser will automatically open to `http://localhost:3000` 🎉

## Verify Everything Works

### Run Tests
```bash
npm run test
```

Expected output: All tests should pass ✓

### Build for Production
```bash
npm run build
```

Expected output: Build completes successfully and creates `dist/` folder

## What's Next?

### For Developers
1. Read [SETUP.md](docs/SETUP.md) for detailed setup instructions
2. Check [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
3. Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for architecture overview

### For Users
1. Open `http://localhost:3000` in your browser
2. Connect your Stellar wallet (Freighter, Ledger, Trezor, etc.)
3. Start trading on the Stellar network!

## Common Issues

### Port 3000 Already in Use?
Change the port in `configs/webpack.dev.js`:
```js
devServer: {
    port: 3001,  // Use any available port
}
```

### Module Not Found?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails?
```bash
npm run clean  # Clear build cache
npm run build  # Try building again
```

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run test` | Run test suite |
| `npm run lint` | Check code quality |
| `npm run build` | Build for production |
| `npm run validate` | Run all checks |

## Need Help?

- 📚 **Documentation**: Check the `/docs` folder
- 🐛 **Issues**: [GitHub Issues](https://github.com/lunarexchange/lunar-exchange/issues)
- 💬 **Chat**: [Discord](https://discord.gg/lunar-exchange)
- 📧 **Email**: support@lunar-exchange.io

---

**Happy Trading! 🌙**
