
#!/bin/bash

# Wait a bit for the server to start
echo "Waiting for the server to start..."
sleep 5

# Make a request to the server
RESPONSE=$(curl -s http://localhost:3000)

# Check if the response contains "Virtual Art Gallery"
if echo "$RESPONSE" | grep -q "Virtual Art Gallery"; then
  echo "Test Passed: Found 'Virtual Art Gallery' in the response."
  exit 0
else
  echo "Test Failed: Couldn't find 'Virtual Art Gallery' in the response."
  exit 1
fi
