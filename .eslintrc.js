module.exports = {
	'env': {
		'commonjs': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'plugins': [
		'@typescript-eslint'
	],
	'rules': {
		'semi': [
			'error',
			'always'
		],
		'@typescript-eslint/explicit-function-return-type': 'warn'
	},
	'ignorePatterns': ['lib/**/*', 'examples/**/*', 'node_modules/**/*']
};
