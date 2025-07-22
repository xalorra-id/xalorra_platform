#!/bin/bash

PROJECT_ROOT="/opt/xalorra-discord"

echo "🚀 Menyusun ulang struktur direktori Xalorra Discord..."

# 1. Hapus duplikat sample.csv di tempat yang tidak semestinya
rm -f "$PROJECT_ROOT/sample.csv"
rm -f "$PROJECT_ROOT/apps/api/sample.csv"

# 2. Pastikan folder uploads ada
mkdir -p "$PROJECT_ROOT/uploads"

# 3. Pindahkan sample.csv ke uploads (jika perlu)
if [ -f "$PROJECT_ROOT/apps/datasets/sample.csv" ]; then
  cp "$PROJECT_ROOT/apps/datasets/sample.csv" "$PROJECT_ROOT/uploads/sample.csv"
fi

# 4. Pastikan semua direktori inti ada
mkdir -p "$PROJECT_ROOT/apps/api/models"
mkdir -p "$PROJECT_ROOT/apps/api/routers"
mkdir -p "$PROJECT_ROOT/apps/api/services"
mkdir -p "$PROJECT_ROOT/apps/bot/data"
mkdir -p "$PROJECT_ROOT/apps/bot/handlers"
mkdir -p "$PROJECT_ROOT/apps/bot/utils"
mkdir -p "$PROJECT_ROOT/apps/datasets"
mkdir -p "$PROJECT_ROOT/prisma"

# 5. Tambahkan file .gitignore standar Python + Node
cat > "$PROJECT_ROOT/.gitignore" <<EOF
# Python
__pycache__/
*.py[cod]
*.egg-info/
.env
*.sqlite3
xgboost_model.json

# Node/npm (kalau pakai di bot)
node_modules/
dist/
npm-debug.log*

# MacOS/Linux/IDE
.DS_Store
*.swp
.idea/
.vscode/
EOF

# 6. Pastikan file .env ada
touch "$PROJECT_ROOT/.env"

# 7. Reminder untuk README
if [ ! -f "$PROJECT_ROOT/README.md" ]; then
  echo "# Xalorra Discord" > "$PROJECT_ROOT/README.md"
  echo "Dokumentasi awal untuk proyek Discord + AI training bot." >> "$PROJECT_ROOT/README.md"
fi

echo "✅ Struktur proyek berhasil disesuaikan!"
