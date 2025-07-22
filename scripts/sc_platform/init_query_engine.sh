#!/bin/bash

PROJECT_ROOT="/opt/xalorra_platform/backend/query-engine"

echo "📁 Membuat struktur folder di $PROJECT_ROOT ..."
mkdir -p $PROJECT_ROOT/{db/migrations,core,routes,middlewares,models,utils,logs}

echo "📄 Membuat file Python starter..."
touch $PROJECT_ROOT/db/connection.py
touch $PROJECT_ROOT/db/migrations/init.sql
touch $PROJECT_ROOT/core/query_executor.py
touch $PROJECT_ROOT/core/query_logger.py
touch $PROJECT_ROOT/routes/query.py
touch $PROJECT_ROOT/middlewares/auth_middleware.py
touch $PROJECT_ROOT/models/query_log_model.py
touch $PROJECT_ROOT/models/dataset_model.py
touch $PROJECT_ROOT/utils/sql_builder.py
touch $PROJECT_ROOT/utils/log_utils.py
touch $PROJECT_ROOT/main.py

echo "📦 Membuat requirements.txt ..."
cat <<EOL > $PROJECT_ROOT/requirements.txt
asyncpg
python-dotenv
EOL

echo "📝 Menambahkan README dan log file ..."
echo "# Xalorra Query Engine" > $PROJECT_ROOT/README.md
touch $PROJECT_ROOT/logs/query.log

echo "🧪 Membuat virtual environment di $PROJECT_ROOT/venv ..."
cd $PROJECT_ROOT
python3 -m venv venv

echo "✅ Mengaktifkan venv dan install dependencies..."
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo "✅ Setup selesai! Struktur dan dependencies terpasang di $PROJECT_ROOT"
