#!/bin/sh
# exit when any command fails
set -e

URL="https://dl.cryptlex.com/downloads/"
VERSION="v4.12.0";
wget ${URL}${VERSION}/LexFloatClient-Static-Linux.zip
mkdir -p ./tmp/linux
unzip -o LexFloatClient-Static-Linux.zip -d ./tmp/linux

cp ./tmp/linux/libs/musl/arm64/libLexFloatClient.a ./
CROSS_COMPILE="aarch64-linux-musl" 
export AR=${CROSS_COMPILE}-ar
export LD=${CROSS_COMPILE}-ld
export CC=${CROSS_COMPILE}-gcc
export CXX=${CROSS_COMPILE}-g++
npm i
node-gyp rebuild --arch=aarch64
cp ./build/Release/lexfloatclient.node ./lib/bindings/linux/musl/arm64
rm -f LexFloatClient-Static-Linux.zip