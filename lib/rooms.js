const fs = require('fs');
const { Room, Tiles } = require('lucid-dream');
const { randomInt } = require('./rng');
const { fill2dArray } = require('./utils');

const directionMap = [
	[ 0, 1 ],
	[ 0, -1 ],
	[ 1, 0 ],
	[ -1, 0 ]
];

function intersects(room1, room2) {
	const rb1 = room1.getBounds();
	const rb2 = room2.getBounds();
	return (rb1.x1 < rb2.x2 && rb1.x2 > rb2.x1 &&
		rb1.y1 < rb2.y2 && rb1.y2 > rb2.y1);
}

exports.generateRooms = function(opts = {}) {
	const { roomCount = 20 } = opts;
	const rooms = [];
	let lastRoom;

	for (let i = 0; i < roomCount; i++) {
		if (!lastRoom) {
			const pos = [ 0, 0 ];
			const room = new Room(pos, {
				name: `room${i.toString().padStart(3, '0')}`,
				size: [ randomInt(40, 100), randomInt(23, 80) ]
			});
			rooms.push(room);
			lastRoom = room;
		} else {
			let pos, isIntersected, room;
			do {
				const size = [ randomInt(40, 100), randomInt(23, 80) ];
				const direction = directionMap[randomInt(0, 3)];
				if (direction[0] === 1) {
					pos = [
						lastRoom.position[0] + lastRoom.size[0],
						lastRoom.position[1]
					];
				} else if (direction[0] === -1) {
					pos = [
						lastRoom.position[0] - size[0] * 8,
						lastRoom.position[1]
					];
				} else if (direction[1] === 1) {
					pos = [
						lastRoom.position[0],
						lastRoom.position[1] + lastRoom.size[1]
					];
				} else {
					pos = [
						lastRoom.position[0],
						lastRoom.position[1] - size[1] * 8
					];
				}

				room = new Room(pos, {
					name: `room${i.toString().padStart(3, '0')}`,
					size
				});

				for (let iRoom of rooms) {
					isIntersected = intersects(room, iRoom);
					if (isIntersected) { break; }
				}
			} while (isIntersected);

			rooms.push(room);
			lastRoom = room;
		}
	}

	return rooms;
};

exports.generateTiles = function(rooms) {
	for (let room of rooms) {
		const [ width, height ] = room.size.map(s => s / 8);
		const tiles = fill2dArray(height, width, '0');

		for (let i = 0; i < tiles.length; i++) {
			const row = tiles[i];
			if (i === 0 || i === tiles.length - 1) {
				row.fill('1');
			} else {
				row[0] = row[row.length - 1] = '1';
			}
		}

		room.fgTiles = new Tiles(tiles);
	}
};

exports.drawRooms = async function(map) {
	return new Promise((resolve, reject) => {
		const { createCanvas } = require('canvas');
		const bounds = map.getBounds();
		const xOffset = bounds.x1 !== 0 ? -bounds.x1 : 0;
		const yOffset = bounds.y1 !== 0 ? -bounds.y1 : 0;
		const width = bounds.x2 + xOffset;
		const height = bounds.y2 + yOffset;

		const canvas = createCanvas(width, height);
		const ctx = canvas.getContext('2d');

		// background color
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, width, height);

		// boxes for each room
		ctx.strokeStyle = '#ff0000';
		ctx.lineWidth = 4;
		for (let room of map.rooms) {
			const { x1, y1, x2, y2 } = room.getBounds(xOffset, yOffset);
			const width = x2 - x1;
			const height = y2 - y1;

			ctx.fillStyle = '#eeeeee';
			ctx.fillRect(x1, y1, width, height);
			ctx.strokeRect(x1, y1, width, height);
			ctx.fillStyle = '#000000';
			ctx.textAlign = 'center';
			ctx.font = 'bold 24px "Consolas", sans-serif';
			ctx.fillText(room.name, x1 + width / 2, y1 + height / 2);
		}

		const outFile = 'map.png';
		const out = fs.createWriteStream(outFile);
		const stream = canvas.createPNGStream();
		stream.pipe(out);
		out.on('finish', () => {
			console.log(`debug map written to ${outFile}`);
			return resolve();
		});
		out.on('error', reject);
	});
}