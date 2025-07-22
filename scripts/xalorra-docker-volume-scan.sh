#!/bin/bash

echo "=== Xalorra Docker Volume Scan ==="

# List semua volume Docker
volumes=$(docker volume ls -q)

# Pattern yang mencurigakan
PATTERN="kdevtmpfsi|minerd|wget|curl|sh|bash|base64|eval|\.pl|\.py|\.php"

for volume in $volumes; do
    echo ""
    echo "🔍 Scanning volume: $volume"
    
    docker run --rm -v $volume:/mnt alpine sh -c "
        find /mnt -type f -exec grep -aEi '$PATTERN' {} \; -print
    "
done

echo ""
echo "✅ Selesai scan. Harap periksa hasil di atas."
