const request = require('request');
const unzipper = require('unzipper');
const fs = require('fs');
const os = require('os');
const path = require('path');
const isNonGlibcLinux = require('detect-libc').isNonGlibcLinux;
const platform = process.env.npm_config_target_platform || os.platform();
const targetArch = process.env.npm_config_target_arch || null;
const buildFromSource = process.env.npm_config_build_from_source != null;
const version = "v4.5.1";

async function download(url, files, destPath) {
	const directory = await unzipper.Open.url(request, url);
	for (let i = 0; i < files.length; i++) {
		const file = directory.files.find((file) => file.path === files[i]);
		const content = await file.buffer();
		await fs.writeFileSync(destPath + path.basename(files[i]), content);
	}
}

function isMusl() {
	if (os.platform() != 'linux') {
		return false;
	}
	if (isNonGlibcLinux) {
		return true;
	}
	return false;
}

async function main() {
	try {
		let arch = os.arch();
		const baseUrl = 'https://dl.cryptlex.com/downloads/';

		let url; let files;
		switch (platform) {
		case 'darwin': // OSX
			if (buildFromSource == null) {
				return;
			}
			files = ['libs/clang/universal/libLexFloatClient.a'];
			url = '/LexFloatClient-Static-Mac.zip';
			break;
		case 'win32': // windows
			if (buildFromSource == null) {
				return;
			}
			if (targetArch == 'ia32') {
				arch = 'x86';
			}
			files = ['libs/vc14/' + arch + '/LexFloatClient.lib', 'libs/vc14/' + arch + '/LexFloatClient.dll'];
			url = '/LexFloatClient-Win.zip';
			break;
		case 'linux': // linux
			if (targetArch == 'ia32') {
				arch = 'x32';
			}
			url = '/LexFloatClient-Static-Linux.zip';
			let dir = '';
			switch (arch) {
			case 'arm':
				dir = os.endianness() === 'LE' ? 'armel' : 'armhf';
				break;
			case 'arm64':
				dir = 'arm64';
				break;
			case 'x64':
				if (buildFromSource == null && !isMusl()) {
					return;
				}
				dir = 'amd64';
				break;
			case 'x32':
				dir = 'i386';
				break;
			default:
				throw Error('Unsupported Linux arch: ' + arch);
			}
			if (isMusl()) {
				files = ['libs/musl/' + dir + '/libLexFloatClient.a'];
			} else {
				files = ['libs/gcc/' + dir + '/libLexFloatClient.a'];
			}
			break;
		default:
			throw Error('Unsupported platform: ' + platform);
		}
		console.log(`Downloading LexFloatClient library for ${platform} ${arch} ...`);
		await download(baseUrl + version + url, files, './');

		console.log(`LexFloatClient library successfully downloaded!`);
		process.exit(0);
	} catch (error) {
		console.error(error);
	}
}

main();
