#!/bin/bash
# Agent: Generuj snapshot projektu — statystyki, pliki, zależności
echo "📸 Generuję snapshot projektu..."
echo ""

VERSION=$(node -p "require('./package.json').version")
echo "Wersja: v$VERSION"
echo "Data: $(date '+%Y-%m-%d %H:%M')"
echo ""

echo "=== Pliki źródłowe (src/) ==="
find src/ -name "*.ts" -o -name "*.tsx" | sort
echo ""
echo "Łącznie: $(find src/ -name "*.ts" -o -name "*.tsx" | wc -l | tr -d ' ') plików"
echo ""

echo "=== Kolekcje CMS ==="
ls src/collections/*.ts 2>/dev/null | wc -l | tr -d ' '
echo " kolekcji"

echo "=== Globale CMS ==="
ls src/globals/*.ts 2>/dev/null | wc -l | tr -d ' '
echo " globali"

echo "=== Zależności ==="
node -p "
const pkg = require('./package.json');
const deps = {...pkg.dependencies, ...pkg.devDependencies};
['next','payload','react','tailwindcss','typescript'].map(d => d + ': ' + (deps[d]||'n/a')).join('\n')
"

echo ""
echo "=== TypeScript ==="
npx tsc --noEmit 2>&1
if [ $? -eq 0 ]; then
  echo "✅ 0 błędów"
else
  echo "❌ Błędy TypeScript!"
fi
