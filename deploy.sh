#!/bin/bash
set -e

BUILD_FOLDER=.dist

npx next build
rm -rf $BUILD_FOLDER
mv .next/standalone/ $BUILD_FOLDER/
mkdir -p $BUILD_FOLDER/.next
cp -r .next/static $BUILD_FOLDER/.next/static
cp -r .next/server $BUILD_FOLDER/.next/server
rm $BUILD_FOLDER/server.js
cp -r next.config.js $BUILD_FOLDER/
cp serverless.yml $BUILD_FOLDER/
cp server.ts $BUILD_FOLDER/
cp package.json $BUILD_FOLDER/
cp -r serverless-http $BUILD_FOLDER
cp -r public $BUILD_FOLDER/
cd $BUILD_FOLDER
npx sls deploy

