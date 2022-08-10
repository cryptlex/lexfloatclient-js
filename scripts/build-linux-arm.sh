#!/bin/bash
# exit when any command fails
set -e
# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" finished with exit code $?."' EXIT
source ~/.bashrc

URL="https://dl.cryptlex.com/downloads/"
VERSION="v4.7.2";
wget ${URL}${VERSION}/LexFloatClient-Static-Linux.zip
mkdir -p ./tmp/linux
unzip -o LexFloatClient-Static-Linux.zip -d ./tmp/linux

cp ./tmp/linux/libs/gcc/arm64/libLexFloatClient.a ./
CROSS_COMPILE="aarch64-linux-gnu" 
export AR=${CROSS_COMPILE}-ar
export LD=${CROSS_COMPILE}-ld
export CC=${CROSS_COMPILE}-gcc
export CXX=${CROSS_COMPILE}-g++
npm i
node-gyp rebuild --arch=aarch64
cp ./build/Release/lexfloatclient.node ./lib/bindings/linux/gcc/arm64
rm -f LexFloatClient-Static-Linux.zip