#!/bin/sh

# Start Ollama in the background.
echo "Starting Ollama server..."
ollama serve &

# Record Process ID.
pid=$!

# Pause for Ollama to start.
sleep 5

echo "🔴 Retrieve Llama3.2 model..."
ollama pull llama3.2

echo "🟢 Done!"
# Wait for Ollama process to finish.
wait $pid
