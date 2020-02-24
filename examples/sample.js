/* eslint-disable new-cap */
const { LexFloatClient, LexFloatStatusCodes, LexFloatClientException } = require('@cryptlex/lexfloatclient');

function licenseCallback(status) {
	if (LexFloatStatusCodes.LF_OK == status) {
		console.log('The license lease has renewed successfully.');
	} else if (LexFloatStatusCodes.LF_E_LICENSE_NOT_FOUND == status) {
		console.log('The license expired before it could be renewed.');
	} else if (LexFloatStatusCodes.LF_E_LICENSE_EXPIRED_INET == status) {
		console.log('The license expired due to network connection failure.');
	} else {
		console.log('The license renew failed due to other reason. Error code: ', status);
	}
}

function main() {
	try {
		// Set the product id
		LexFloatClient.SetHostProductId('bb65d1d9-34a9-4add-9f73-61fc49fc91ed');

		// Set the float server
		LexFloatClient.SetHostUrl('http://localhost:8090');

		// Set the license callback
		LexFloatClient.SetFloatingLicenseCallback(licenseCallback);

		// Request license lease
		LexFloatClient.RequestFloatingLicense();
		console.log('Success! License acquired!');

		// console.log("Requesting license metadata...");
		// metadataValue = LexFloatClient.GetHostLicenseMetadata("key1");
		// console.log(metadataValue);

		// console.log("Dropping the license ...");
		// LexFloatClient.DropFloatingLicense();
		// console.log("Success! License dropped.");
	} catch (error) {
		console.log(error.code, error.message);
	}
}

main();

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));
