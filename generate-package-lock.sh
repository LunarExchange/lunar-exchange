#!/bin/bash

# Generate package-lock.json if it doesn't exist
# This script is meant to be run in CI or on systems where npm is available

echo "🔍 Checking for package-lock.json..."

if [ -f "package-lock.json" ]; then
    echo "✅ package-lock.json already exists"
    exit 0
fi

echo "📦 Generating package-lock.json..."
npm install --package-lock-only

if [ -f "package-lock.json" ]; then
    echo "✅ package-lock.json generated successfully"
    echo "📊 Lockfile stats:"
    wc -l package-lock.json
    ls -lh package-lock.json
else
    echo "❌ Failed to generate package-lock.json"
    exit 1
fi

echo "✅ Done! You can now commit package-lock.json"
