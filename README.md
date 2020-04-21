![Build @cryptlex/lexfloatclient package](https://github.com/cryptlex/lexfloatclient-js/workflows/Build%20@cryptlex/lexfloatclient%20package/badge.svg)

# @cryptlex/lexactivator

Cryptlex lets you license your software apps effortlessly. You can easily generate license keys using the REST API or Dashboard and validate the license keys in your software apps using LexActivator (Cryptlex client library), implement floating licenses using LexFloatClient library.

Additionally, you can offer trials, subscriptions, floating licenses and much more.

**LexFloatClient.js** is a Node.js wrapper for LexFloatClient licensing library.

## Installation

    npm install @cryptlex/lexfloatclient

Then you can include it in your code:

	const { LexFloatClient, LexFloatStatusCodes, LexFloatClientException } = require('@cryptlex/lexfloatclient');

**Note:** In case you are building a cross platform **Electron** app, you can install LexActivator for other targetted platforms as follows:

    npm install @cryptlex/lexfloatclient --target_arch=ia32 --target_platform=win32 --target_libc=unknown
    npm install @cryptlex/lexfloatclient --target_arch=x64 --target_platform=win32 --target_libc=unknown
    npm install @cryptlex/lexfloatclient --target_arch=x64 --target_platform=darwin --target_libc=unknown
    npm install @cryptlex/lexfloatclient --target_arch=x64 --target_platform=linux --target_libc=glibc

This would install the precompiled binaries for the targetted platforms.


## Usage
Refer to following for documentation:

https://docs.cryptlex.com/floating-licenses/on-premise-floating-licenses/using-lexfloatclient/using-lexfloatclient-with-node.js
