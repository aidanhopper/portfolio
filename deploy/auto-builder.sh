#!/bin/sh
set -e

echo "=== Portfolio Auto-Pull & Build Watcher Started ==="

# Function to build and publish static files to shared volume
build_and_publish() {
  echo "Building static site..."
  npm ci
  npm run build
  echo "Publishing built files to Nginx..."
  mkdir -p /out
  rm -rf /out/*
  cp -r dist/* /out/
  echo "=== Deployment update complete! ==="
}

# Initial build on container startup
build_and_publish

# Loop to poll Git repository for new commits
POLL_INTERVAL=${GIT_POLL_INTERVAL:-30}

while true; do
  sleep "$POLL_INTERVAL"
  git fetch origin main 2>/dev/null || git fetch origin 2>/dev/null || true

  LOCAL=$(git rev-parse HEAD 2>/dev/null || echo "")
  REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "$LOCAL")

  if [ -n "$LOCAL" ] && [ -n "$REMOTE" ] && [ "$LOCAL" != "$REMOTE" ]; then
    echo "New commits detected on remote repository! Pulling changes..."
    git pull
    build_and_publish
  fi
done
