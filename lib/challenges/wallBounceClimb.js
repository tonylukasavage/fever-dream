const { Entity } = require('lucid-dream');

const sideOpts = {
	A: {
		surfaceHeight: 3,
		surfaceWidth: 2,
		distanceY: 5,
		distanceX: 9
	}
};

function generate(room, x, y, opts) {
	const { side = 'A', height } = opts;
	const { surfaceHeight, surfaceWidth, distanceY, distanceX } = sideOpts[side];
	const tiles = room.fgTiles.data;
	const entities = [];

	let offsetH = 0;
	let offsetW = 0;
	let noOfClimbs = Math.floor(height / (surfaceHeight + distanceY));
	for (let i = 0; i < noOfClimbs; i++) {
		offsetH = i * (surfaceHeight + distanceY);
		offsetW = i % 2 ? 0 : distanceX;
		for (let h = 0; h < surfaceHeight; h++) {
			for (let w = 0; w < surfaceWidth; w++) {
				tiles[(y + height) - (h + offsetH)][x + w + offsetW] = '1';
			}
		}

		const refill = new Entity.Refill({
			x: (i % 2 === 0 ? x + surfaceWidth + 1 : x + surfaceWidth + distanceX - 2.5) * 8,
			y: (y + height - ((i + 1) * (surfaceHeight + distanceY)) + 2) * 8
		});
		if (room.name === 'room000') {
			console.log({ x: refill.data.x, y: refill.data.y });
		}
		room.entities.push(refill);
	}

	return {
		tiles,
		entities
	};
}

module.exports = {
	name: 'Wall Bounce Climb',
	generate
};