class Pawn {
	constructor(row, col, player) {
		this.row = row;
		this.col = col;
		this.player = player;
		this.symbol = (player == "human") ? 'p' : 'P';
	}

	move(row, col) {
		this.row = row;
		this.col = col;
	}

	getMoves(board) {
		let moves = [];	
	}
}

module.exports = Pawn;