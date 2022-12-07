import path from 'path';
import { isNonGlibcLinuxSync } from 'detect-libc';

// Using this line correctly with import would mean using top-level await which we cannot 
// support at the moment.
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const LexFloatClientNative = require(getLibraryPath());

function getLibraryPath(): string {
	switch (process.platform) {
		case 'darwin':
			return path.join(__dirname, 'bindings/macos', process.arch, 'lexfloatclient.node');
		case 'win32':
			return path.join(__dirname, 'bindings/windows', process.arch === 'ia32' ? 'x32' : process.arch, 'lexfloatclient.node');
		case 'linux':
			return path.join(__dirname, 'bindings/linux', isNonGlibcLinuxSync() ? 'musl' : 'gcc', process.arch, 'lexfloatclient.node');
	}
	throw Error(`LexFloatClient library not found for your platform ${process.platform}.`);
}

export function arrayToString(array: Uint8Array): string {
	if (process.platform == 'win32') {
		return Buffer.from(array).toString('utf16le').replace(/\0.*$/g, '');
	} else {
		return Buffer.from(array).toString('utf8').replace(/\0.*$/g, '');
	}
}
