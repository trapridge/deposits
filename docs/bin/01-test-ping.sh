#!/usr/bin/env bash
set -euo pipefail

HOST=localhost:3000
curl -sv http://$HOST/api/ping

# Should return a "pong"
