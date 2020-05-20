exports.fill2dArray = function(rows, cols, val) {
	return Array.from({ length: rows }, () => (
		Array.from({ length: cols }, () => val)
	));
};