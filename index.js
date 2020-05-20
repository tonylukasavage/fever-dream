const { Entity, Side } = require('lucid-dream');
const rooms = require('./lib/rooms');
const rng = require('./lib/rng');

const binFile = 'fever-dream.bin';

(async function() {
	try {
		// init seeded RNG
		rng.seed(process.argv[2]);

		// create the side for the map
		const side = new Side();
		const { map } = side;

		// generate the rooms
		map.rooms = rooms.generateRooms();
		rooms.generateTiles(map.rooms);
		map.rooms[0].entities.push(new Entity.Player({
			x: 160,
			y: 50
		}));
		await rooms.drawRooms(map);

		// encode the side
		await side.encode(binFile);
		console.log(`map written to ${binFile}`);

	} catch (err) {
		console.error(err.stack);
		process.exit(1);
	}
})();