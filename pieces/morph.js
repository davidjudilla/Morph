class Morph {
	constructor(initPiece, col, row, player) {
		this.pieceFlow = ['B', 'N', 'R'];
		this.flowIndex = this.pieceFlow.indexOf(initPiece.toUpperCase());
		this.row = row;
		this.col = col;
		this.player = player;
	}

	get symbol() {
		return (this.player == 0) ? 
			this.pieceFlow[this.flowIndex].toLowerCase() : 
			this.pieceFlow[this.flowIndex].toUpperCase();	
	}	

	move(col, row) {
		this.row = row;
		this.col = col;
		this.flowIndex = (flowIndex + 1) % pieceFlow.length
	}

	getMoves(board) {
		let moves = [];	
	}
}

module.exports = Morph;