class King {
	constructor(row, col, player) {
		this.row = row;
		this.col = col;
		this.player = player;
		this.symbol = (player == "human") ? 'k' : 'K';
	}

	move(row, col) {
		this.row = row;
		this.col = col;
	}

	getMoves(board) {
		let moves = [];	
	}

}

module.exports = King;