#!/bin/bash
# doctor_build_fix.sh - Automatic build repair for Digital Office
set -euo pipefail

REPO="/root/.openclaw/workspace/digital-office"
cd "$REPO"

MAX_ATTEMPTS=3

echo "=== Build Doctor Starting ==="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install --legacy-peer-deps
fi

attempt=1

while [ $attempt -le $MAX_ATTEMPTS ]; do
    echo ""
    echo "=== Attempt $attempt/$MAX_ATTEMPTS ==="
    
    # Run build and capture output
    if npm run build > /tmp/build_log.txt 2>&1; then
        echo "SUCCESS: Build completed"
        exit 0
    fi
    
    echo "Build failed. Parsing errors..."
    
    # Check for TypeScript errors with undefined
    if grep -q "is not assignable to parameter of type number" /tmp/build_log.txt; then
        echo "Found: TypeScript number assignment error"
        
        # Fix formatCurrency calls - wrap with ?? 0
        sed -i 's/formatCurrency(kpis\./formatCurrency(kpis./g' src/app/office/page.tsx
        sed -i 's/formatCurrency(kpis\./formatCurrency((kpis./g' src/app/office/page.tsx
        
        # More aggressive fix - any kpis.* value without ?? 0
        sed -i 's/formatCurrency(kpis\([^,)]*\))/formatCurrency(\1 ?? 0)/g' src/app/office/page.tsx
        
        echo "Applied fix for undefined KPI values"
        git diff src/app/office/page.tsx
    fi
    
    # Check for module errors
    if grep -q "Cannot find module" /tmp/build_log.txt; then
        echo "Found: Missing module"
        MISSING=$(grep "Cannot find module" /tmp/build_log.txt | head -1 | sed 's/.*Cannot find module .//' | sed "s/'//g")
        if [ -n "$MISSING" ]; then
            npm install "$MISSING" --legacy-peer-deps || true
        fi
    fi
    
    # Check for ESLint errors
    if grep -q "ESLint" /tmp/build_log.txt; then
        echo "Found: ESLint errors"
        # Run eslint fix
        npx eslint --fix src/app/office/ || true
    fi
    
    attempt=$((attempt + 1))
done

echo "=== Build failed after $MAX_ATTEMPTS attempts ==="
echo "Last 120 lines of log:"
tail -120 /tmp/build_log.txt
exit 1
