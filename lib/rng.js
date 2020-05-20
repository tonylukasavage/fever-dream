const seedrandom = require('seedrandom');

let rng;

exports.seed = function(string) {
	rng = seedrandom(string ||
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
};

exports.randomInt = function(min, max) {
	return Math.floor(rng() * (max - min + 1)) + min;
};

exports.randomDecimal = function(min, max) {
	return rng() * (max - min) + min;
};