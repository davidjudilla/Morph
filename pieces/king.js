class King {
	constructor(col, row, player) {
		this.row = row;
		this.col = col;
		this.player = player;
		this.symbol = (player == 0) ? 'k' : 'K';
		this.offsets = [
			[-1,0]
		];
		if (this.player != 0) {
			this.offsets = this.offsets.map(offset => offset.map(x => -x))
		}
	}

	move(col, row) {
		this.row = row;
		this.col = col;
	}

	getMoves(board) {
		let moves = [];	
		this.offsets.forEach(offset => {
			moves.push(`${this.col + offset[0]}${this.row + offset[1]}`);
		});

		return moves.filter(x => x)
	}

	toString() {
		return `${this.constructor.name} col:${this.col} row:${this.row} p:${this.player}`
	}

}

module.exports = King;