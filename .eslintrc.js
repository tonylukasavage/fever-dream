module.exports = {
	'env': {
		'commonjs': true,
		'es6': true,
		'node': true,
		'mocha': true
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2020
	},
	'ignorePatterns': [ 'docs/*' ],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'space-infix-ops': [
			'error'
		],
		'space-before-blocks': [
			'error'
		],
		'eqeqeq': [
			'error',
			'smart'
		],
		'no-trailing-spaces': [ 'error' ],
		'no-irregular-whitespace': [ 'error' ],
		'no-multi-spaces': [ 'error', { 'ignoreEOLComments': true } ],
		'spaced-comment': [ 'error', 'always', { 'exceptions': [ '*', '/' ] } ]
	}
};
