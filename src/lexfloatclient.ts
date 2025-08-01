import { LexFloatClientException } from "./lexfloatclient-exception";
import { arrayToString, LexFloatClientNative } from "./lexfloatclient-native";
import { LexFloatStatusCodes } from "./lexfloatstatus-codes";

/**
 *  @class HostLicenseMeterAttribute
 *  @constructor
 */
export class HostLicenseMeterAttribute {
	/** The name of the meter attribute. */
	name: string;
	/** The allowed uses of the meter attribute. A value of -1 indicates unlimited allowed uses. */
	allowedUses: number;
	/** The total uses of the meter attribute. */
	totalUses: number;
	/** The gross uses of the meter attribute. */
	grossUses: number;
	/**
	 * @param name The name of the meter attribute.
	 * @param allowedUses The allowed uses of the meter attribute. A value of -1 indicates unlimited allowed uses.
	 * @param totalUses The total uses of the meter attribute.
	 * @param grossUses The gross uses of the meter attribute.
	 */
	constructor(name: string, allowedUses: number, totalUses: number, grossUses: number) {
		this.name = name;
		this.allowedUses = allowedUses;
		this.totalUses = totalUses;
		this.grossUses = grossUses;
	}
}

/**
 * @class PermissionFlags
 * @constructor
 */
export const PermissionFlags = {
	'LF_USER': 10,
	'LF_ALL_USERS': 11,
};
/**
 * @class HostProductVersionFeatureFlag
 * @constructor
 */
export class HostProductVersionFeatureFlag {
	/** The name of the feature flag. */
	name: string;
	/** Status of the feature flag. */
	enabled: boolean;
	/** Data associated to the feature flag. */
	data: string;

	/**
	 * @param name The name of the feature flag.
	 * @param enabled Status of the feature flag.
	 * @param data Data associated to the feature flag.
	 */
	constructor(name: string, enabled: boolean, data: string) {
		this.name = name;
		this.enabled = enabled;
		this.data = data;
	}
}

/**
 * @class HostFeatureEntitlement
 * @constructor
 * @property {string} featureName The name of the feature.
 * @property {string} featureDisplayName The display name of the feature.
 * @property {string} value The value of the feature.
 */
export class HostFeatureEntitlement {
	featureName: string;
	featureDisplayName: string;
	value: string; 

	constructor(featureName: string, featureDisplayName: string, value: string) {
		this.featureName = featureName;
		this.featureDisplayName = featureDisplayName;
		this.value = value;
	}
}

/**
 * @class HostConfig
 * @constructor
 */
export class HostConfig {
    maxOfflineLeaseDuration: number;
	constructor(maxOfflineLeaseDuration: number){
		this.maxOfflineLeaseDuration = maxOfflineLeaseDuration;
	}
};

/**
 * @class LexFloatClient
 */
export class LexFloatClient {
	/**
	 * Sets the product id of your application.
	 *
	 * @param {string} productId the unique product id of your application as mentioned on
	 * the product page in the dashboard.
	 * @throws {LexFloatClientException}
	 */
	static SetHostProductId(productId: string): void {
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
	static SetHostUrl(hostUrl: string): void {
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
	static SetFloatingLicenseCallback(licenseCallback: () => number): void {
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
	 * @param {string} value string of maximum length 4096 characters with utf-8 encoding.
	 * encoding.
	 * @throws {LexFloatClientException}
	 */
	static SetFloatingClientMetadata(key: string, value: string): void {
		const status = LexFloatClientNative.SetFloatingClientMetadata(key, value);
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}
	
	/**
	 * Sets the permission flag for your application.
	 *
	 * This function must be called on every start of your program after the SetHostProductId()
	 * function if the application allows borrowing of licenses or system-wide activation.
	 *
	 * @param {PermissionFlags} flag - depending on your application's requirements, choose one of 
	 * the following values: LF_USER, LF_ALL_USERS.
	 *  - LF_USER: This flag indicates that the application does not require admin or root permissions to run.
	 *  - LF_ALL_USERS: This flag is specifically designed for Windows and should be used for system-wide activations.
	 * @throws {LexFloatClientException} 
	 */
	static SetPermissionFlag(flag: typeof PermissionFlags[keyof typeof PermissionFlags]): void {
		const status = LexFloatClientNative.SetPermissionFlag(flag);
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}

	/**
	 * Gets the product version name.
	 * @deprecated This function is deprecated. Use GetHostLicenseEntitlementSetName() instead.
	 * @returns Returns the product version name.
	 * @throws {LexFloatClientException}
	 */
	static GetHostProductVersionName(): string {
		const array = new Uint8Array(256);
		const status = LexFloatClientNative.GetHostProductVersionName(array, array.length);
		if (status != LexFloatStatusCodes.LF_OK) {
			throw new LexFloatClientException(status);
		}
		return arrayToString(array);
	}

	/**
	 * Gets the product version display name.
	 * @deprecated This function is deprecated. Use GetHostLicenseEntitlementSetDisplayName() instead.
	 * @returns Returns the product version display name.
	 * @throws {LexFloatClientException}
	 */
	static GetHostProductVersionDisplayName(): string {
		const array = new Uint8Array(256);
		const status = LexFloatClientNative.GetHostProductVersionDisplayName(array, array.length);
		if (status != LexFloatStatusCodes.LF_OK) {
			throw new LexFloatClientException(status);
		}
		return arrayToString(array);
	}
	
	/**
	 * Gets the mode of the floating license (online or offline).
	 * @returns floating license mode.
	 * @throws {LexFloatClientException}
	 */
	static GetFloatingLicenseMode(): string {
		const array = new Uint8Array(256);
		const status = LexFloatClientNative.GetFloatingLicenseMode(array, array.length);
		if (status != LexFloatStatusCodes.LF_OK) {
			throw new LexFloatClientException(status);
		}
		return arrayToString(array);
	}

	/**
	 * Gets the product version feature flag.
	 * @deprecated This function is deprecated. Use GetHostFeatureEntitlement() instead.
	 * @param {string} name 
	 * @returns Returns the product version feature flag.
	 * @throws {LexFloatClientException}
	 */
	static GetHostProductVersionFeatureFlag(name: string): HostProductVersionFeatureFlag {
		const enabled = new Uint32Array(1);
		const array = new Uint8Array(256);
		const status = LexFloatClientNative.GetHostProductVersionFeatureFlag(name, enabled, array, array.length);
		switch (status) {
			case LexFloatStatusCodes.LF_OK:
				return new HostProductVersionFeatureFlag(name, Boolean(enabled[0]), arrayToString(array));
			default:
				throw new LexFloatClientException(status);
		}
	}

	/**
	 * Gets the name of the entitlement set associated with the LexFloatServer license.
	 * @return {string} Returns the host license entitlement set name.
	 * @throws {LexFloatClientException}
	 */
	static GetHostLicenseEntitlementSetName(): string {
		const array = new Uint8Array(256);
		const status = LexFloatClientNative.GetHostLicenseEntitlementSetName(array, array.length);
		if (status != LexFloatStatusCodes.LF_OK) {
			throw new LexFloatClientException(status);
		}
		return arrayToString(array);
	}

	/**	
	 * Gets the display name of the entitlement set associated with the LexFloatServer license.
	 * @return {string} Returns the host license entitlement set display name.
	 * @throws {LexFloatClientException}
	 */
	static GetHostLicenseEntitlementSetDisplayName(): string {
		const array = new Uint8Array(256);
		const status = LexFloatClientNative.GetHostLicenseEntitlementSetDisplayName(array, array.length);
		if (status != LexFloatStatusCodes.LF_OK) {
			throw new LexFloatClientException(status);
		}
		return arrayToString(array);
	}

	/**
	 * Gets the feature entitlements associated with the LexFloatServer license.
	 * @return {HostFeatureEntitlement[]} Returns the host license feature entitlements.
	 * @throws {LexFloatClientException}
	 */
	static GetHostFeatureEntitlements(): HostFeatureEntitlement[] {
		const array = new Uint8Array(4096);
		const status = LexFloatClientNative.GetHostFeatureEntitlements(array, array.length);
		if (status != LexFloatStatusCodes.LF_OK) {
			throw new LexFloatClientException(status);
		}
		return JSON.parse(arrayToString(array)) || [];
	}

	/**
	 * Gets the feature entitlement associated with the LexFloatServer license.
	 * @param {string} featureName The name of the feature.
	 * @return {HostFeatureEntitlement} Returns the host license feature entitlement.
	 * @throws {LexFloatClientException}
	 */
	static GetHostFeatureEntitlement(featureName: string): HostFeatureEntitlement {
		const array = new Uint8Array(1024);
		const status = LexFloatClientNative.GetHostFeatureEntitlement(featureName, array, array.length);
		if (status != LexFloatStatusCodes.LF_OK) {
			throw new LexFloatClientException(status);
		}
		return JSON.parse(arrayToString(array)) || {};
	}

	/**
	 * Gets the value of the product metadata.
	 *
	 *
	 * @param {string} key key of the metadata field whose value you want to get
	 * @return Returns the metadata key value
	 * @throws {LexFloatClientException}
	 */
	static GetHostProductMetadata(key: string): string {
		const array = new Uint8Array(4096);
		const status = LexFloatClientNative.GetHostProductMetadata(key, array, array.length);
		if (status != LexFloatStatusCodes.LF_OK) {
			throw new LexFloatClientException(status);
		}
		return arrayToString(array);
	}

	/**
	 * Get the value of the license metadata field associated with the
	 * LexFloatServer license key.
	 *
	 * @param {string} key key of the metadata field whose value you want to get
	 * @return Returns the metadata key value
	 * @throws {LexFloatClientException}
	 */
	static GetHostLicenseMetadata(key: string): string {
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
	static GetHostLicenseMeterAttribute(name: string): HostLicenseMeterAttribute {
		const allowedUses = new BigInt64Array(1);
		const totalUses = new BigUint64Array(1);
		const grossUses = new BigUint64Array(1);
		const status = LexFloatClientNative.GetHostLicenseMeterAttribute(name, allowedUses, totalUses, grossUses);
		switch (status) {
			case LexFloatStatusCodes.LF_OK:
				return new HostLicenseMeterAttribute(name, Number(allowedUses[0]) ? Number(allowedUses[0]) : 0, Number(totalUses[0]) ? Number(totalUses[0]) : 0, Number(grossUses[0]) ? Number(grossUses[0]) : 0);
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
	static GetHostLicenseExpiryDate(): number {
		const expiryDate = new Uint32Array(1);
		const status = LexFloatClientNative.GetHostLicenseExpiryDate(expiryDate);
		switch (status) {
			case LexFloatStatusCodes.LF_OK:
				return expiryDate[0] ? expiryDate[0] : 0;
			default:
				throw new LexFloatClientException(status);
		}
	}

	/**
	 *  This function sends a network request to LexFloatServer to get the configuration details.
	 * 
	 * @return Configuration details
	 * @throws {LexActivatorException}
	 */
	static GetHostConfig(): HostConfig | null {
		const array = new Uint8Array(1024);
		const status = LexFloatClientNative.GetHostConfig(array, array.length)
		if (status != LexFloatStatusCodes.LF_OK) {
			throw new LexFloatClientException(status);
		}
		let hostConfigObject;
		try {
			hostConfigObject = JSON.parse(arrayToString(array));
		} catch {
			hostConfigObject = {};
		}
		let hostConfig = null;
		if (Object.keys(hostConfigObject).length > 0) {
			hostConfig = new HostConfig(hostConfigObject.maxOfflineLeaseDuration);
			return hostConfig;
		}
		return hostConfig;
	}

	/**
	 * Gets the meter attribute uses consumed by the floating client.
	 *
	 * @param {string} name name of the meter attribute
	 * @return Returns the value of meter attribute uses by the floating client.
	 * @throws {LexFloatClientException}
	 */
	static GetFloatingClientMeterAttributeUses(name: string): number {
		const uses = new Uint32Array(1);
		const status = LexFloatClientNative.GetFloatingClientMeterAttributeUses(name, uses);
		if (LexFloatStatusCodes.LF_OK == status) {
			return uses[0] ? uses[0] : 0;
		}
		throw new LexFloatClientException(status);
	}


	/**
	 * Gets the value of the floating client metadata.
	 *
	 * @param {string} key key of the metadata field whose value you want to get
	 * @return Returns the metadata key value
	 * @throws {LexFloatClientException}
	 */
	static GetFloatingClientMetadata(key: string): string {
		const array = new Uint8Array(4096);
		const status = LexFloatClientNative.GetFloatingClientMetadata(key, array, array.length);
		if (status != LexFloatStatusCodes.LF_OK) {
			throw new LexFloatClientException(status);
		}
		return arrayToString(array);
	}
	/**
	 * Gets the library version.
	 * @returns Returns the library version.
	 * @throws {LexFloatClientException}
	 */
	static GetFloatingClientLibraryVersion(): string {
		const array = new Uint8Array(256);
		const status = LexFloatClientNative.GetFloatingClientLibraryVersion(array, array.length);
		if (status != LexFloatStatusCodes.LF_OK) {
			throw new LexFloatClientException(status);
		}
		return arrayToString(array);
	}

	/**
	 * Sends the request to lease the license from the LexFloatServer.
	 *
	 * @throws {LexFloatClientException}
	 */
	static RequestFloatingLicense(): void {
		const status = LexFloatClientNative.RequestFloatingLicense();
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}
	
	/**
	 * Sends the request to lease the license from the LexFloatServer for offline usage.
	 * The maximum value of lease duration is configured in the config.yml of LexFloatServer 
	 *
	 * @param {number} leaseDuration value of the lease duration.
	 * @throws {LexFloatClientException}
	 */
	static RequestOfflineFloatingLicense(leaseDuration: number): void {
		const status = LexFloatClientNative.RequestOfflineFloatingLicense(leaseDuration);
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
	static DropFloatingLicense(): void {
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
	static HasFloatingLicense(): boolean {
		const status = LexFloatClientNative.HasFloatingLicense();
		switch (status) {
			case LexFloatStatusCodes.LF_OK:
				return true;
			case LexFloatStatusCodes.LF_E_NO_LICENSE:
				return false;
			case LexFloatStatusCodes.LF_FAIL:
				return false;
			default:
				throw new LexFloatClientException(status);
		}
	}

	/**
	 * Gets the lease expiry date timestamp of the floating client.
	 *
	 * @return Returns the timestamp
	 * @throws {LexFloatClientException}
	 */
	static GetFloatingClientLeaseExpiryDate(): number {
		const expiryDate = new Uint32Array(1);
		const status = LexFloatClientNative.GetFloatingClientLeaseExpiryDate(expiryDate);
		switch (status) {
			case LexFloatStatusCodes.LF_OK:
				return expiryDate[0] ? expiryDate[0] : 0;
			default:
				throw new LexFloatClientException(status);
		}
	}

	/**
	 * Increments the meter attribute uses of the floating client.
	 *
	 * @param {string} name name of the meter attribute
	 * @param {number} increment the increment value
	 * @throws {LexFloatClientException}
	 */
	static IncrementFloatingClientMeterAttributeUses(name: string, increment: number): void {
		const status = LexFloatClientNative.IncrementFloatingClientMeterAttributeUses(name, increment);
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}

	/**
	 * Decrements the meter attribute uses of the floating client.
	 *
	 * @param {string} name name of the meter attribute
	 * @param {number} decrement the decrement value
	 * @throws {LexFloatClientException}
	 */
	static DecrementFloatingClientMeterAttributeUses(name: string, decrement: number): void {
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
	static ResetFloatingClientMeterAttributeUses(name: string): void {
		const status = LexFloatClientNative.ResetFloatingClientMeterAttributeUses(name);
		if (LexFloatStatusCodes.LF_OK != status) {
			throw new LexFloatClientException(status);
		}
	}


}

