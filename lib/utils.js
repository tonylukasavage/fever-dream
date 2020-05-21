const { randomInt } = require('./rng');

exports.fill2dArray = function(rows, cols, val) {
	return Array.from({ length: rows }, () => (
		Array.from({ length: cols }, () => val)
	));
};

exports.nextRoomPosition = function(room, size, direction) {
	direction = direction || [ 'right', 'left', 'up', 'down' ][randomInt(0, 3)];

	switch (direction) {
		case 'right':
			return [ room.position[0] + room.size[0], room.position[1] ];
		case 'left':
			return [ room.position[0] - size[0] * 8, room.position[1] ];
		case 'up':
			return [ room.position[0], room.position[1] + room.size[1] ];
		case 'down':
			return [ room.position[0], room.position[1] - size[1] * 8 ];
		default:
			throw new Error(`invalid direction "${direction}"`);
	}
};

exports.superimpose = function(src, dst, x, y) {
	for (let i = 0; i < src.length; i++) {
		for (let j = 0; j < src[0].length; j++) {
			dst[y + i][x + j] = src[i][j];
		}
	}
};

exports.printTileArray = function(tiles) {
	console.log(tiles.map(t => t.join('')).join('\n'));
};