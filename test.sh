
#!/bin/bash

# Starting test
echo "Starting test..."
echo "Waiting for the server to start..."
sleep 5

# Make a request to the server
echo "Making request to http://localhost:3000"
RESPONSE=$(curl -s http://localhost:3000)
echo "Response received:"
echo "$RESPONSE" | head -n 20

# Check if the response contains "Virtual Art Gallery"
if echo "$RESPONSE" | grep -q "Virtual Art Gallery"; then
  echo "Test Passed: Found 'Virtual Art Gallery' in the response."
  exit 0
else
  echo "Test Failed: Couldn't find 'Virtual Art Gallery' in the response."
  exit 1
fi
