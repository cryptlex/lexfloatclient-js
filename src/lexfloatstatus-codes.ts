export const LexFloatStatusCodes = {

	/**
	 * Success code.
     */
	LF_OK: 0,

	/**
	 * Failure code.
	 */
	LF_FAIL: 1,

	/**
	 * The product id is incorrect.
	 */
	LF_E_PRODUCT_ID: 40,

	/**
	 * Invalid or missing callback function.
	 */
	LF_E_CALLBACK: 41,

	/**
	 * Missing or invalid server url.
	 */
	LF_E_HOST_URL: 42,

	/**
	 * Ensure system date and time settings are correct.
	 */
	LF_E_TIME: 43,

	/**
	 * Failed to connect to the server due to network error.
	 */
	LF_E_INET: 44,

	/**
	 * License has not been leased yet.
	 */
	LF_E_NO_LICENSE: 45,

	/**
	 * License has already been leased.
	 */
	LF_E_LICENSE_EXISTS: 46,

	/**
	 * License does not exist on server or has already expired. This
	 * happens when the request to refresh the license is delayed.
	 */
	LF_E_LICENSE_NOT_FOUND: 47,

	/**
	 * License lease has expired due to network error. This
	 * happens when the request to refresh the license fails due to
	 * network error.
	 */
	LF_E_LICENSE_EXPIRED_INET: 48,

	/**
	 * The server has reached it's allowed limit of floating licenses.
	 */
	LF_E_LICENSE_LIMIT_REACHED: 49,

	/**
	 * The buffer size was smaller than required.
	 */
	LF_E_BUFFER_SIZE: 50,

	/**
	 * The metadata key does not exist.
	 */
	LF_E_METADATA_KEY_NOT_FOUND: 51,

	/**
	 * Metadata key length is more than 256 characters.
	 */
	LF_E_METADATA_KEY_LENGTH: 52,

	/**
	 * Metadata value length is more than 4096 characters.
	 */
	LF_E_METADATA_VALUE_LENGTH: 53,

	/**
	 * The floating client has reached it's metadata fields limit.
	 */
	LF_E_FLOATING_CLIENT_METADATA_LIMIT: 54,

	/**
	 * The meter attribute does not exist.
	 */
	LF_E_METER_ATTRIBUTE_NOT_FOUND: 55,

	/**
	 * The meter attribute has reached it's usage limit.
	 */
	LF_E_METER_ATTRIBUTE_USES_LIMIT_REACHED: 56,

	/**
	 * No product version is linked with the license.
	 */
	LF_E_PRODUCT_VERSION_NOT_LINKED: 57,

	/**
	 * The product version feature flag does not exist.
	 */
	LF_E_FEATURE_FLAG_NOT_FOUND: 58,

    /**
     * Insufficient system permissions.
    */
    LF_E_SYSTEM_PERMISSION: 59,

	/**
	 * IP address is not allowed.
	 */
	LF_E_IP: 60,

    /**
     * Invalid permission flag.
     */
    LF_E_INVALID_PERMISSION_FLAG: 61,

    /**
     * Offline floating license is not allowed for per-instance leasing strategy.
     */
    LF_E_OFFLINE_FLOATING_LICENSE_NOT_ALLOWED: 62,

    /**
     * Maximum offline lease duration exeeded.
     */

    LF_E_MAX_OFFLINE_LEASE_DURATION_EXCEEDED: 63,

    /**
     * Allowed offline floating clients limit reached.
     */
    LF_E_ALLOWED_OFFLINE_FLOATING_CLIENTS_LIMIT_REACHED: 64,

    /**
     * Fingerprint couldn't be generated because Windows Management Instrumentation (WMI) service has been disabled. 
     * This error is specific to Windows only.
     */
    LF_E_WMIC : 65,

    /**
     * Machine fingerprint has changed since activation.
     */
    LF_E_MACHINE_FINGERPRINT : 66,

	/**
	 * Client error.
	 */
	LF_E_CLIENT: 70,

	/**
	 * Server error.
	 */
	LF_E_SERVER: 71,

	/**
	 * System time on server has been tampered with. Ensure
	 * your date and time settings are correct on the server machine.
	*/
	LF_E_SERVER_TIME_MODIFIED: 72,

	/**
	 * The server has not been activated using a license key.
	 */
	LF_E_SERVER_LICENSE_NOT_ACTIVATED: 73,

	/**
	 * The server license has expired.
	 */
	LF_E_SERVER_LICENSE_EXPIRED: 74,

	/**
	 * The server license has been suspended.
	 */
	LF_E_SERVER_LICENSE_SUSPENDED: 75,

	/**
	 * The grace period for server license is over.
	 */
	LF_E_SERVER_LICENSE_GRACE_PERIOD_OVER: 76
};
