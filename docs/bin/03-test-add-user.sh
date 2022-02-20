#!/usr/bin/env bash
set -euo pipefail

HOST=localhost:3000
PAYLOAD=$(cat <<EOF
{
  "email": "$1"
}
EOF
)

curl -sv -d "$PAYLOAD" -H "Content-Type: application/json" http://$HOST/api/users

# Should return the newly added user
