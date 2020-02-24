# @cryptlex.lexfloatclient

Cryptlex lets you license your software apps effortlessly. You can easily generate license keys using the REST API or Dashboard and validate the license keys in your software apps using LexActivator (Cryptlex client library), implement floating licenses using LexFloatClient library.

Additionally, you can offer trials, subscriptions, floating licenses and much more.

**LexFloatClient.js** is a Node.js wrapper for LexFloatClient licensing library.

## Installation

    npm install @cryptlex/lexfloatclient

Then you can include it in your code:

	const { LexFloatClient, LexFloatStatusCodes, LexFloatClientException } = require('@cryptlex/lexfloatclient');

**Note:** On Windows make sure you install the windows-build-tools package first:

    npm install --global windows-build-tools --vs2015



## Usage
Refer to following for documentation:

https://docs.cryptlex.com/floating-licenses/on-premise-floating-licenses/using-lexfloatclient/using-lexfloatclient-with-node.js
