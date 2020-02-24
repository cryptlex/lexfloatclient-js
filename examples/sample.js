/* eslint-disable new-cap */
const readlineSync = require('readline-sync');
const { LexFloatClient, LexFloatStatusCodes, LexFloatClientException } = require('../index');

function licenseCallback(status) {
	if (LexFloatStatusCodes.LF_OK == status) {
		console.log("The license lease has renewed successfully.");
	}
	else if (LexFloatStatusCodes.LF_E_LICENSE_NOT_FOUND == status) {
		console.log("The license expired before it could be renewed.");
	}
	else if (LexFloatStatusCodes.LF_E_LICENSE_EXPIRED_INET == status) {
		console.log("The license expired due to network connection failure.");
	}
	else {
		console.log("The license renew failed due to other reason. Error code: ", status);
	}
}

function main() {
	try {
		// Set the product id
		LexFloatClient.SetHostProductId("PASTE_PRODUCT_ID");

		// Set the float server
		LexFloatClient.SetHostUrl("http://localhost:8090");

		// Set the license callback
		LexFloatClient.SetFloatingLicenseCallback(licenseCallback);

		// Request license lease
		LexFloatClient.RequestFloatingLicense();
		console.log("Success! License acquired!");

		// readlineSync.keyInPause("Press enter to get the license metadata...");
		// Request license metadata
		// metadataValue = LexFloatClient.GetHostLicenseMetadata("key1");
		// console.log(metadataValue);

		// Drop license lease
		readlineSync.keyInPause("Press enter to drop the license ...");
		LexFloatClient.DropFloatingLicense();
		console.log("Success! License dropped.");
	} catch (error) {
		console.log(error.code, error.message);
	}
}

main();

readlineSync.keyInPause("Press any key to exit!");
