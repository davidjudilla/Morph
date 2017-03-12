class Morph {
	constructor(initPiece, row, col, player) {
		this.pieceFlow = ['B', 'N', 'R'];
		this.flowIndex = this.pieceFlow.indexOf(initPiece.toUpperCase());
		this.row = row;
		this.col = col;
		this.player = player;
	}

	get symbol() {
		return (this.player == "human") ? 
			this.pieceFlow[this.flowIndex].toLowerCase() : 
			this.pieceFlow[this.flowIndex].toUpperCase();	
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