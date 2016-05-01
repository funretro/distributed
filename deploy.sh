#!/bin/sh
LAST_COMMIT=$(git log -1 --pretty=format:'%h %an %s')
echo "Deploying changes from $LAST_COMMIT"
gh-pages -r git@github.com:funretro/distributed.git -d dist -m "Updates from $LAST_COMMIT"
