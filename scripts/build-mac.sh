URL="https://dl.cryptlex.com/downloads/"
VERSION="v4.5.2"
curl ${URL}${VERSION}/LexFloatClient-Static-Mac.zip
unzip LexFloatClient-Static-Mac.zip -d ./mac

cp ./mac/libs/gcc/universal/libLexFloatClient.a ./
npm i
node-gyp rebuild 
cp ./build/Release/lexfloatclient.node ./lib/bindings/macos/x64


cp ./mac/libs/gcc/universal/libLexFloatClient.a ./
node-gyp rebuild --arch=arm64
cp ./build/Release/lexfloatclient.node ./lib/bindings/macos/arm64
