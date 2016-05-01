#!/bin/sh
LAST_COMMIT=$(git log -1 --pretty=format:"Updates from %h [%an] %s")
gh-pages -r git@github.com:funretro/distributed.git -d dist -m $LAST_COMMIT
