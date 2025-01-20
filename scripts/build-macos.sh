# exit when any command fails
set -e
# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" finished with exit code $?."' EXIT

URL="https://dl.cryptlex.com/downloads/"
VERSION="v4.10.0";
curl ${URL}${VERSION}/LexFloatClient-Static-Mac.zip -o LexFloatClient-Static-Mac.zip
mkdir -p ./tmp/macos
unzip -o LexFloatClient-Static-Mac.zip -d ./tmp/macos

cp ./tmp/macos/libs/clang/universal/libLexFloatClient.a ./
npm i
python3 -m pip install setuptools
node-gyp rebuild 
cp ./build/Release/lexfloatclient.node ./lib/bindings/macos/x64

SDKROOT=$(xcrun --sdk macosx --show-sdk-path) node-gyp rebuild --arch=arm64
cp ./build/Release/lexfloatclient.node ./lib/bindings/macos/arm64
rm -f LexFloatClient-Static-Mac.zip
