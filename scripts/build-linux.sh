#!/bin/bash
# exit when any command fails
set -e
# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" finished with exit code $?."' EXIT
source ~/.bashrc
URL="https://dl.cryptlex.com/downloads/"
VERSION="v4.12.0";
wget ${URL}${VERSION}/LexFloatClient-Static-Linux.zip
mkdir -p ./tmp/linux
unzip -o LexFloatClient-Static-Linux.zip -d ./tmp/linux

cp ./tmp/linux/libs/gcc/amd64/libLexFloatClient.a ./
npm i
node-gyp rebuild 
cp ./build/Release/lexfloatclient.node ./lib/bindings/linux/gcc/x64
rm -f LexFloatClient-Static-Linux.zip