#!/bin/bash

# Inisialisasi Git
git init

# Tambahkan .gitignore standar Python + Node
cat > .gitignore <<EOF
# Python
__pycache__/
*.pyc
*.pyo
*.pyd
.env
.env.*

# VSCode
.vscode/

# Node
node_modules/
dist/
.next/
out/

# Logs & DB
*.log
*.sqlite
*.db

# OS
.DS_Store
Thumbs.db

# Prisma
prisma/migrations/

# Supabase
.supabase/
EOF

# Tambah dan commit pertama
git add .
git commit -m "Initial commit: setup Discord bot + Prisma + Supabase"

echo "✅ Git repo initialized and .gitignore created."
