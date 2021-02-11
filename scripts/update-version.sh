#!/bin/bash
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo 'Versão atual do pacote:' $PACKAGE_VERSION

npx json --in-place -f 'packages/common/package.json' -e 'this.version="'PACKAGE_VERSION'"';
npx json --in-place -f 'packages/apps/hub-web/package.json' -e 'this.version="'PACKAGE_VERSION'"';
