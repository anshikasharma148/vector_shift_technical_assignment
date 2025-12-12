#!/bin/bash
# Backend startup script

cd "$(dirname "$0")/backend"

# Check if packages are installed
if ! python3 -c "import fastapi, uvicorn" 2>/dev/null; then
    echo "Installing backend dependencies..."
    pip3 install --break-system-packages -r requirements.txt
fi

# Start the backend server
echo "Starting backend server on http://localhost:8000"
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000


