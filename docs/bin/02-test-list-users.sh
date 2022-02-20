#!/usr/bin/env bash

set -euo pipefail

HOST=localhost:3000

curl -sv -H "Content-Type: application/json" http://$HOST/api/users

# Should return a list of all users
