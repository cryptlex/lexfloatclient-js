#!/bin/bash
source ~/.bashrc
URL="https://dl.cryptlex.com/downloads/"
VERSION="v4.5.2"
wget ${URL}${VERSION}/LexFloatClient-Static-Linux.zip
unzip -o LexFloatClient-Static-Linux.zip -d ./tmp/linux

cp ./tmp/linux/libs/gcc/amd64/libLexFloatClient.a ./
npm i
node-gyp rebuild 
cp ./build/Release/lexfloatclient.node ./lib/bindings/linux/gcc/x64
rm LexFloatClient-Static-Linux.zip