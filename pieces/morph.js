class Morph {
	constructor(initPiece, row, col, player) {
		this.row = row;
		this.col = col;
		this.player = player;
		this.pieceType = initPiece.toUpperCase();
		this.symbol = (player == "human") ? 
			this.pieceType.toLowerCase() : this.pieceType.toUpperCase();
	}

	move(row, col) {
		this.row = row;
		this.col = col;
	}

	getMoves(board) {
		let moves = [];	
	}
}

module.exports = Morph;