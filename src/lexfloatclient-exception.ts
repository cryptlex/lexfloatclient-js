import { LexFloatStatusCodes } from "./lexfloatstatus-codes";

export class LexFloatClientException extends Error {
	/** LexFloatClientException numeric identifier */
	code: number;
	constructor(code: number) {
		super(LexFloatClientException.getErrorMessage(code));
		this.code = code;
		Error.captureStackTrace(this, this.constructor);
	}

	static getErrorMessage(code: number): string {
		let message = 'Unknown error!';
		switch (code) {
			case LexFloatStatusCodes.LF_E_PRODUCT_ID:
				message = "The product id is incorrect.";
				break;
			case LexFloatStatusCodes.LF_E_CALLBACK:
				message = "Invalid or missing callback function.";
				break;
			case LexFloatStatusCodes.LF_E_HOST_URL:
				message = "Missing or invalid server url.";
				break;
			case LexFloatStatusCodes.LF_E_TIME:
				message = "Ensure system date and time settings are correct.";
				break;
			case LexFloatStatusCodes.LF_E_INET:
				message = "Failed to connect to the server due to network error.";
				break;
			case LexFloatStatusCodes.LF_E_NO_LICENSE:
				message = "License has not been leased yet.";
				break;
			case LexFloatStatusCodes.LF_E_LICENSE_EXISTS:
				message = "License has already been leased.";
				break;
			case LexFloatStatusCodes.LF_E_LICENSE_NOT_FOUND:
				message = "License does not exist on server or has already expired.";
				break;
			case LexFloatStatusCodes.LF_E_LICENSE_EXPIRED_INET:
				message = "License lease has expired due to network error.";
				break;
			case LexFloatStatusCodes.LF_E_LICENSE_LIMIT_REACHED:
				message = "The server has reached it's allowed limit of floating licenses.";
				break;
			case LexFloatStatusCodes.LF_E_BUFFER_SIZE:
				message = "The buffer size was smaller than required.";
				break;
			case LexFloatStatusCodes.LF_E_METADATA_KEY_NOT_FOUND:
				message = "The metadata key does not exist.";
				break;
			case LexFloatStatusCodes.LF_E_METADATA_KEY_LENGTH:
				message = "Metadata key length is more than 256 characters.";
				break;
			case LexFloatStatusCodes.LF_E_METADATA_VALUE_LENGTH:
				message = "Metadata value length is more than 4096 characters.";
				break;
			case LexFloatStatusCodes.LF_E_FLOATING_CLIENT_METADATA_LIMIT:
				message = "The floating client has reached it's metadata fields limit.";
				break;
			case LexFloatStatusCodes.LF_E_METER_ATTRIBUTE_NOT_FOUND:
				message = "The meter attribute does not exist.";
				break;
			case LexFloatStatusCodes.LF_E_METER_ATTRIBUTE_USES_LIMIT_REACHED:
				message = "The meter attribute has reached it's usage limit.";
				break;
			case LexFloatStatusCodes.LF_E_PRODUCT_VERSION_NOT_LINKED:
				message = "No product version is linked with the license.";
				break;
			case LexFloatStatusCodes.LF_E_FEATURE_FLAG_NOT_FOUND:
				message = "The product version feature flag does not exist.";
				break;
			case LexFloatStatusCodes.LF_E_IP:
				message = "IP address is not allowed.";
				break;
			case LexFloatStatusCodes.LF_E_CLIENT:
				message = "Client error.";
				break;
			case LexFloatStatusCodes.LF_E_SERVER:
				message = "Server error.";
				break;
			case LexFloatStatusCodes.LF_E_SERVER_TIME_MODIFIED:
				message = "System time on server has been tampered with.";
				break;
			case LexFloatStatusCodes.LF_E_SERVER_LICENSE_NOT_ACTIVATED:
				message = "The server has not been activated using a license key.";
				break;
			case LexFloatStatusCodes.LF_E_SERVER_LICENSE_EXPIRED:
				message = "The server license has expired.";
				break;
			case LexFloatStatusCodes.LF_E_SERVER_LICENSE_SUSPENDED:
				message = "The server license has been suspended.";
				break;
			case LexFloatStatusCodes.LF_E_SERVER_LICENSE_GRACE_PERIOD_OVER:
				message = "The grace period for server license is over.";
				break;
			case LexFloatStatusCodes.LF_E_SYSTEM_PERMISSION:
				message = "Insufficient system permissions.";
				break;
			case LexFloatStatusCodes.LF_E_INVALID_PERMISSION_FLAG:
				message = "Invalid permission flag.";
				break;
			case LexFloatStatusCodes.LF_E_OFFLINE_FLOATING_LICENSE_NOT_ALLOWED:
				message = "Offline floating license is not allowed for per-instance leasing strategy.";
				break;
			case LexFloatStatusCodes.LF_E_MAX_OFFLINE_LEASE_DURATION_EXCEEDED:
				message = "Maximum offline lease duration exeeded.";
				break;
			case LexFloatStatusCodes.LF_E_ALLOWED_OFFLINE_FLOATING_CLIENTS_LIMIT_REACHED:
				message = "Allowed offline floating clients limit reached.";
				break;
			case LexFloatStatusCodes.LF_E_WMIC:
				message = "Fingerprint couldn't be generated because Windows Management Instrumentation (WMI) service has been disabled. This error is specific to Windows only";
				break;
			case LexFloatStatusCodes.LF_E_MACHINE_FINGERPRINT:
				message = "Machine fingerprint has changed since activation.";
				break;
			case LexFloatStatusCodes.LF_E_PROXY_NOT_TRUSTED:
				message = "Request blocked due to untrusted proxy.";
				break;
			case LexFloatStatusCodes.LF_E_ENTITLEMENT_SET_NOT_LINKED:
				message = "No entitlement set is linked to the license.";
				break;
			case LexFloatStatusCodes.LF_E_FEATURE_ENTITLEMENT_NOT_FOUND:
				message = "The feature entitlement does not exist.";
				break;
			default:
				message = 'Unknown error!';
		}
		return message;
	}
}
