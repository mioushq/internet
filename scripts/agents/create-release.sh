#!/bin/bash
# Agent: Utwórz nowy release — folder + snapshot + changelog
# Użycie: ./scripts/agents/create-release.sh 1.1.0

VERSION=$1
if [ -z "$VERSION" ]; then
  echo "Użycie: $0 <wersja> (np. 1.1.0)"
  exit 1
fi

RELEASE_DIR="releases/v$VERSION"

if [ -d "$RELEASE_DIR" ]; then
  echo "⚠️  Release v$VERSION już istnieje!"
  exit 1
fi

echo "📦 Tworzę release v$VERSION..."
mkdir -p "$RELEASE_DIR"

# Snapshot
echo "📸 Generuję snapshot..."
bash scripts/agents/snapshot.sh > "$RELEASE_DIR/snapshot.md" 2>&1

# Check TypeScript
echo "🔍 Sprawdzam TypeScript..."
npx tsc --noEmit 2>&1
TS_STATUS=$?

# Check collections
echo "🔍 Sprawdzam kolekcje..."
bash scripts/agents/check-collections.sh > "$RELEASE_DIR/code-review.md" 2>&1

# Check env
bash scripts/agents/check-env.sh >> "$RELEASE_DIR/code-review.md" 2>&1

# Stats
FILES_COUNT=$(find src/ -name "*.ts" -o -name "*.tsx" | wc -l | tr -d ' ')
COLLECTIONS_COUNT=$(ls src/collections/*.ts 2>/dev/null | wc -l | tr -d ' ')
GLOBALS_COUNT=$(ls src/globals/*.ts 2>/dev/null | wc -l | tr -d ' ')

# README
cat > "$RELEASE_DIR/README.md" << EOF
# Release v$VERSION

**Data:** $(date '+%Y-%m-%d')
**TypeScript:** $([ $TS_STATUS -eq 0 ] && echo "✅ 0 błędów" || echo "❌ Błędy")

## Statystyki
- Pliki źródłowe: $FILES_COUNT
- Kolekcje CMS: $COLLECTIONS_COUNT
- Globale CMS: $GLOBALS_COUNT

## Jak uruchomić
\`\`\`bash
npm install
docker compose up postgres -d
npm run dev
npm run seed
\`\`\`
EOF

# Update package.json version
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json','utf8'));
pkg.version = '$VERSION';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

echo ""
echo "✅ Release v$VERSION utworzony w $RELEASE_DIR/"
echo "   - README.md"
echo "   - snapshot.md"
echo "   - code-review.md"
echo ""
echo "📝 Pamiętaj zaktualizować docs/CHANGELOG.md!"
