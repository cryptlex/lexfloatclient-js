const request = require('request');
const unzipper = require('unzipper');
const fs = require('fs');
const os = require('os');
const path = require('path');

const version = 'v4.3.3';

async function download(url, files, destPath) {
	const directory = await unzipper.Open.url(request, url);
	for (let i = 0; i < files.length; i++) {
		const file = directory.files.find((file) => file.path === files[i]);
		const content = await file.buffer();
		await fs.writeFileSync(destPath + path.basename(files[i]), content);
	}
}

function isMusl() {
	const output = require('child_process').spawnSync('ldd', ['--version']).stderr.toString('utf8');
	if (output.indexOf('musl') > -1) {
		return true;
	}
	return false;
}

async function main() {
	try {
		const arch = os.arch();
		const plat = os.platform();

		console.log(`Downloading LexFloatClient library for ${plat} ${arch} ...`);

		const baseUrl = 'https://dl.cryptlex.com/downloads/';

		let url; let files;

		switch (plat) {
		case 'darwin': // OSX
			files = ['libs/clang/x86_64/libLexFloatClient.dylib'];
			url = '/LexFloatClient-Mac.zip';
			break;
		case 'win32': // windows
			files = ['libs/vc14/' + arch + '/LexFloatClient.lib', 'libs/vc14/' + arch + '/LexFloatClient.dll'];
			url = '/LexFloatClient-Win.zip';
			break;
		case 'linux': // linux
			url = '/LexFloatClient-Linux.zip';
			let dir = '';
			switch (arch) {
			case 'arm':
				dir = os.endianness() === 'LE' ? 'armel' : 'armhf';
				break;
			case 'arm64':
				dir = 'arm64';
				break;
			case 'x64':
				dir = 'amd64';
				break;
			case 'x32':
				dir = 'i386';
				break;
			default:
				throw Error('Unsupported Linux arch: ' + arch);
			}
			if (isMusl()) {
				files = ['libs/musl/' + dir + '/libLexFloatClient.so'];
			} else {
				files = ['libs/gcc/' + dir + '/libLexFloatClient.so'];
			}
			break;
		default:
			throw Error('Unsupported platform: ' + plat);
		}

		await download(baseUrl + version + url, files, './');

		console.log(`LexFloatClient library successfully downloaded!`);
	} catch (error) {
		console.error(error);
	}
}

main();
