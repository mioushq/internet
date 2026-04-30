#!/bin/bash
# Agent: Sprawdź czy payload.config.ts zawiera wszystkie kolekcje
echo "🔍 Sprawdzam kolekcje w payload.config.ts..."

COLLECTIONS_DIR="src/collections"
CONFIG_FILE="payload.config.ts"
MISSING=0

for file in "$COLLECTIONS_DIR"/*.ts; do
  BASENAME=$(basename "$file" .ts)
  if ! grep -q "import.*$BASENAME.*from" "$CONFIG_FILE"; then
    echo "❌ Brak importu: $BASENAME ($file)"
    MISSING=$((MISSING + 1))
  fi
done

if [ $MISSING -eq 0 ]; then
  echo "✅ Wszystkie kolekcje zarejestrowane w payload.config.ts"
else
  echo "⚠️  Brak $MISSING kolekcji w konfiguracji!"
  exit 1
fi
