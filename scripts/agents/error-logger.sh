#!/bin/bash
# Agent: Live error logger — monitoruje Next.js dev server i zapisuje błędy
# Użycie: npm run dev 2>&1 | bash scripts/agents/error-logger.sh

LOG_DIR="logs"
mkdir -p "$LOG_DIR"

DATE=$(date '+%Y-%m-%d')
ERROR_LOG="$LOG_DIR/errors-$DATE.log"
FULL_LOG="$LOG_DIR/full-$DATE.log"

echo "📋 Live Error Logger uruchomiony"
echo "   Pełny log: $FULL_LOG"
echo "   Błędy:     $ERROR_LOG"
echo "   $(date '+%Y-%m-%d %H:%M:%S') — Start" | tee -a "$ERROR_LOG"
echo "---"

while IFS= read -r line; do
  # Zapisz każdą linię do pełnego logu
  echo "$line" >> "$FULL_LOG"
  
  # Filtruj i zapisz błędy
  if echo "$line" | grep -qiE '(error|ERROR|⨯|fatal|FATAL|unhandledRejection|ECONNREFUSED|500|TypeError|ReferenceError|SyntaxError)'; then
    TIMESTAMP=$(date '+%H:%M:%S')
    echo "[$TIMESTAMP] $line" | tee -a "$ERROR_LOG"
  fi
  
  # Wyświetlaj też warningi
  if echo "$line" | grep -qiE '(WARN|warning|deprecated)'; then
    TIMESTAMP=$(date '+%H:%M:%S')
    echo "[$TIMESTAMP] ⚠️  $line" | tee -a "$ERROR_LOG"
  fi
done
