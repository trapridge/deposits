#!/usr/bin/env bash

set -euo pipefail

HOST=localhost:3000
PAYLOAD=$(cat <<EOF
{
  "userId": $1,
  "amount": $2
}
EOF
)

curl -sv -d "$PAYLOAD" -H "Content-Type: application/json" http://$HOST/api/deposit

# Should return the deposit transaction
