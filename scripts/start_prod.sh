#!/bin/bash
# start_prod.sh - Build and start Digital Office in production mode

REPO="/root/.openclaw/workspace/digital-office"
cd "$REPO"

echo "=== Starting Digital Office Production ==="

# Run doctor to fix any build issues
if ! bash scripts/doctor_build_fix.sh; then
    echo "Build failed! Cannot start server."
    exit 1
fi

echo "Starting server on port 3000..."
export PORT=3000
npm run start &
sleep 5

# Verify
if ss -lntp | grep -q ":3000"; then
    echo "Server running on port 3000"
    curl -I http://127.0.0.1:3000/office
else
    echo "Failed to start server!"
    exit 1
fi
