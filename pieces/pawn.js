class Pawn {
	constructor(col, row, player) {
		this.row = row;
		this.col = col;
		this.player = player;
		this.symbol = (player == 0) ? 'p' : 'P';
		this.offsets = [
			[0,1],
			[1,1],
			[-1,1]
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
			if (Math.abs(offset.reduce((p,c) => p + c)) == 1) {
				moves.push(`${this.col + offset[0]}${this.row + offset[1]}`);
			} else if (this.validAttack(board, this.col + offset[0], this.row + offset[1])) {
				moves.push(`${this.col + offset[0]}${this.row + offset[1]}`);
			}
		});

		return moves.filter(x => x)
	}
	validAttack(board, col, row) {
		let target = board.getBoardSpace(col, row)
		if (target && target.player != this.player) return true;
		return false
	}

	toString() {
		return `${this.constructor.name} col:${this.col} row:${this.row} p:${this.player}`
	}
}

module.exports = Pawn;