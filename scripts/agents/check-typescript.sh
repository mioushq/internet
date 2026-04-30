#!/bin/bash
# Agent: TypeScript check — 0 błędów wymagane
echo "🔍 Sprawdzam TypeScript..."
npx tsc --noEmit 2>&1
EXIT_CODE=$?
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ TypeScript: 0 błędów"
else
  echo "❌ TypeScript: BŁĘDY ZNALEZIONE"
  exit 1
fi
