#!/bin/bash

set -euo pipefail

# Environment setup
source .env

# Install dependencies
npm install

# Start the development server
npm run dev