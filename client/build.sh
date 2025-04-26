#!/bin/bash
# Fix permission issues
echo "Setting permissions for react-scripts"
chmod -R +x node_modules/.bin/
echo "Running build with CI=false"
CI=false npx react-scripts build
