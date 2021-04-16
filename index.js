/* eslint-disable new-cap */
const { LexFloatClientException } = require('./lib/lexfloatclient-exception');
const { LexFloatStatusCodes } = require('./lib/lexfloatstatus-codes');
const { LexFloatClientNative, arrayToString } = require('./lib/lexfloatclient-native');

/**
 *  @class LicenseMeterAttribute
 *  @type {Object}
 *  @property {name} name The name of the meter attribute.
 *  @property {allowedUses} allowedUses The allowed uses of the meter attribute.
 *  @property {totalUses} totalUses The total uses of the meter attribute.
 *  @property {grossUses} totalUses The gross uses of the meter attribute.
 */
class LicenseMeterAttribute {
	constructor(name, allowedUses, totalUses, grossUses) {
		this.name = name;
		this.allowedUses = allowedUses;
		this.totalUses = totalUses;
		this.grossUses = grossUses;
	}
}
/**
 * @class LexFloatClient
 */
class LexFloatClient {
	/**
	 * Sets the product id of your application.
	 *
	 * @param {string} productId the unique product id of your application as mentioned on
	 * the product page in the dashboard.
	 * @throws {LexFloatClientException}
	 */
	static SetHostProductId(productId) {
		const status = LexFloatClientNative.SetHostProductId(productId);
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}

	/**
     * Sets the network address of the LexFloatServer.
	 * 
     * The url format should be: http://[ip or hostname]:[port]
     *
     * @param {string} hostUrl url string having the correct format
     * @throws {LexFloatClientException}
     */
	static SetHostUrl(hostUrl) {
		const status = LexFloatClientNative.SetHostUrl(hostUrl);
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}

	/**
	 * Sets the renew license callback function.
	 * 
     * Whenever the license lease is about to expire, a renew request is sent to
     * the server. When the request completes, the license callback function
     * gets invoked with one of the following status codes:
	 * 
     * LexFloatStatusCodes.LF_OK, LexFloatStatusCodes.LF_E_INET, LexFloatStatusCodes.LF_E_LICENSE_EXPIRED_INET, LexFloatStatusCodes.LF_E_LICENSE_NOT_FOUND,
     * LexFloatStatusCodes.LF_E_CLIENT, LexFloatStatusCodes.LF_E_IP, LexFloatStatusCodes.LF_E_SERVER, LexFloatStatusCodes.LF_E_TIME,
     * LexFloatStatusCodes.LF_E_SERVER_LICENSE_NOT_ACTIVATED,LexFloatStatusCodes.LF_E_SERVER_TIME_MODIFIED,
     * LexFloatStatusCodes.LF_E_SERVER_LICENSE_SUSPENDED, LexFloatStatusCodes.LF_E_SERVER_LICENSE_EXPIRED,
     * LexFloatStatusCodes.LF_E_SERVER_LICENSE_GRACE_PERIOD_OVER
	 *
	 * @param {function(int)} licenseCallback callback function
	 * @throws {LexFloatClientException}
	 */
	static SetFloatingLicenseCallback(licenseCallback) {
		const status = LexFloatClientNative.SetFloatingLicenseCallback(licenseCallback);
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}


	/**
     * Sets the floating client metadata.
     * 
     * The metadata appears along with the license details of the license in
     * LexFloatServer dashboard.
     *
     * @param {string} key string of maximum length 256 characters with utf-8 encoding.
     * encoding.
     * @param {string} value string of maximum length 256 characters with utf-8 encoding.
     * encoding.
     * @throws {LexFloatClientException}
     */
	static SetFloatingClientMetadata(key, value) {
		const status = LexFloatClientNative.SetFloatingClientMetadata(key, value);
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}

	/**
     * Get the value of the license metadata field associated with the
     * LexFloatServer license key.
     *
     * @param {string} key key of the metadata field whose value you want to get
     * @return Returns the metadata key value
     * @throws {LexFloatClientException}
     */
	static GetHostLicenseMetadata(key) {
		const array = new Uint8Array(256);
		const status = LexFloatClientNative.GetHostLicenseMetadata(key, array, array.length);
		if (status != LexFloatStatusCodes.LF_OK) {
			throw new LexFloatClientException(status);
		}
		return arrayToString(array);
	}

	/**
     * Gets the license meter attribute allowed uses and total uses associated 
     * with the LexFloatServer license.
     *
     * @param {string} name name of the meter attribute
     * @return Returns the values of meter attribute allowed and total uses.
     * @throws {LexFloatClientException}
     */
	static GetHostLicenseMeterAttribute(name) {
		const allowedUses = new Uint32Array(1);
		const totalUses = new Uint32Array(1);
		const grossUses = new Uint32Array(1);
		const status = LexFloatClientNative.GetHostLicenseMeterAttribute(name, allowedUses, totalUses, grossUses);
		switch (status) {
			case LexFloatStatusCodes.LF_OK:
				return new LicenseMeterAttribute(name, allowedUses[0], totalUses[0], grossUses[0]);
			default:
				throw new LexFloatClientException(status);
		}
	}

	/**
     * Gets the license expiry date timestamp of the LexFloatServer license.
     *
     * @return Returns the timestamp
     * @throws {LexFloatClientException}
     */
	static GetHostLicenseExpiryDate() {
		const expiryDate = new Uint32Array(1);
		const status = LexFloatClientNative.GetHostLicenseExpiryDate(expiryDate);
		switch (status) {
			case LexFloatStatusCodes.LF_OK:
				return expiryDate[0];
			default:
				throw new LexFloatClientException(status);
		}
	}

	/**
     * Gets the meter attribute uses consumed by the floating client.
     *
     * @param {string} name name of the meter attribute
     * @return Returns the value of meter attribute uses by the floating client.
     * @throws {LexFloatClientException}
     */
	static GetFloatingClientMeterAttributeUses(name) {
		const uses = new Uint32Array(1);
		const status = LexFloatClientNative.GetFloatingClientMeterAttributeUses(name, uses);
		if (LexFloatStatusCodes.LF_OK == status) {
			return uses[0];
		}
		throw new LexFloatClientException(status);
	}

	/**
     * Sends the request to lease the license from the LexFloatServer.
     *
     * @throws {LexFloatClientException}
     */
	static RequestFloatingLicense() {
		const status = LexFloatClientNative.RequestFloatingLicense();
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}

	/**
     * Sends the request to the LexFloatServer to free the license.
	 * 
     * Call this function before you exit your application to prevent zombie
     * licenses.
     *
     * @throws {LexFloatClientException}
     */
	static DropFloatingLicense() {
		const status = LexFloatClientNative.DropFloatingLicense();
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}

	/**
     * Checks whether any license has been leased or not.
     *
     * @return true or false
     * @throws {LexFloatClientException}
     */
	static HasFloatingLicense() {
		const status = LexFloatClientNative.HasFloatingLicense();
		switch (status) {
			case LexFloatStatusCodes.LF_OK:
				return true;
			case LexFloatStatusCodes.LF_E_NO_LICENSE:
				return false;
			default:
				throw new LexFloatClientException(status);
		}
	}

	/**
     * Increments the meter attribute uses of the floating client.
     *
     * @param {string} name name of the meter attribute
     * @param {string} increment the increment value
     * @throws {LexFloatClientException}
     */
	static IncrementFloatingClientMeterAttributeUses(name, increment) {
		const status = LexFloatClientNative.IncrementFloatingClientMeterAttributeUses(name, increment);
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}

	/**
     * Decrements the meter attribute uses of the floating client.
     *
     * @param {string} name name of the meter attribute
     * @param {string} decrement the decrement value
     * @throws {LexFloatClientException}
     */
	static DecrementFloatingClientMeterAttributeUses(name, decrement) {
		const status = LexFloatClientNative.DecrementFloatingClientMeterAttributeUses(name, decrement);
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}

	/**
     * Resets the meter attribute uses of the floating client.
     *
     * @param {string} name name of the meter attribute
     * @throws {LexFloatClientException}
     */
	static ResetFloatingClientMeterAttributeUses(name) {
		const status = LexFloatClientNative.ResetFloatingClientMeterAttributeUses(name);
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}


}

module.exports = { LexFloatClient, LicenseMeterAttribute, LexFloatStatusCodes, LexFloatClientException };
