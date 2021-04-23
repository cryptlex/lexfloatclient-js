#!/bin/bash
URL="https://dl.cryptlex.com/downloads/"
VERSION="v4.5.2"
wget ${URL}${VERSION}/LexFloatClient-Static-Linux.zip
unzip LexFloatClient-Static-Linux.zip -d ./linux

cp ./linux/libs/gcc/arm64/libLexFloatClient.a ./
CROSS_COMPILE="aarch64-linux-gnu" 
export AR=${CROSS_COMPILE}-ar
export LD=${CROSS_COMPILE}-ld
export CC=${CROSS_COMPILE}-gcc
export CXX=${CROSS_COMPILE}-g++
npm i
node-gyp rebuild --arch=aarch64
cp ./build/Release/lexfloatclient.node ./lib/bindings/linux/gcc/arm64

cp ./linux/libs/gcc/armhf/libLexFloatClient.a ./
CROSS_COMPILE="arm-linux-gnueabihf" 
export AR=${CROSS_COMPILE}-ar
export LD=${CROSS_COMPILE}-ld
export CC=${CROSS_COMPILE}-gcc
export CXX=${CROSS_COMPILE}-g++
node-gyp rebuild --arch=armhf
cp ./build/Release/lexfloatclient.node ./lib/bindings/linux/gcc/arm
