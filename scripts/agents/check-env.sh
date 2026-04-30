#!/bin/bash
# Agent: Sprawdź czy .env.example zawiera wszystkie klucze z .env
echo "🔍 Sprawdzam .env vs .env.example..."

ENV_FILE=".env"
EXAMPLE_FILE=".env.example"
MISSING=0

if [ ! -f "$ENV_FILE" ]; then
  echo "⚠️  Brak pliku .env"
  exit 0
fi

while IFS= read -r line; do
  # Pomiń komentarze i puste linie
  [[ "$line" =~ ^#.*$ ]] && continue
  [[ -z "$line" ]] && continue
  KEY=$(echo "$line" | cut -d'=' -f1)
  if ! grep -q "^$KEY=" "$EXAMPLE_FILE" && ! grep -q "^# $KEY=" "$EXAMPLE_FILE"; then
    echo "❌ Brak w .env.example: $KEY"
    MISSING=$((MISSING + 1))
  fi
done < "$ENV_FILE"

if [ $MISSING -eq 0 ]; then
  echo "✅ .env.example zawiera wszystkie klucze"
else
  echo "⚠️  Brak $MISSING kluczy w .env.example!"
fi
