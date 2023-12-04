#!/bin/sh

URL="https://dl.cryptlex.com/downloads/"
VERSION="v4.8.0";
wget ${URL}${VERSION}/LexFloatClient-Static-Linux.zip
mkdir -p ./tmp/linux
unzip -o LexFloatClient-Static-Linux.zip -d ./tmp/linux

cp ./tmp/linux/libs/musl/amd64/libLexFloatClient.a ./
npm i
node-gyp rebuild 
cp ./build/Release/lexfloatclient.node ./lib/bindings/linux/musl/x64
rm -f LexFloatClient-Static-Linux.zip