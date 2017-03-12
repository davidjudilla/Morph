var layout = require('./layout');
var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

class Board {
	constructor(numCol, numRow) {
		this.numCol = numCol;
		this.numRow = numRow;
		this.board = this.createBoard();
		this.fillWithPieces(this.board, layout);

	}

	createBoard() {
		var row = Array(this.numCol).fill(0)
		var board = [];
		for (var i = 0; i < this.numRow; i++) { board.push(row.slice()); }
		return board;
	}

	fillWithPieces(board, layout) {
		let layoutKeys = Object.keys(layout)

		layoutKeys.forEach(pieceConfig => {
			let { pieceConstr, spaces } = layout[pieceConfig]

			spaces.forEach(space => {
				let { row, col } = space;

				let [oppRow, oppCol] = [this.numRow - row + 1, this.numCol - col + 1] 
				this.setBoardSpace(col, row, new pieceConstr(row, col, "human"))
				this.setBoardSpace(oppCol, oppRow, new pieceConstr(oppRow, oppCol, "opponent"))
			})
		});
	}

	printBoard() {
		console.log(this.board.map((row,i) => {
			return [this.numRow - i, ...row.map(square => square.symbol ? square.symbol : '-')].join(' ')
		}).join('\n'))
		console.log('  ' + letters.join(' '));
	}

	getBoardSpace(col, row) {
		return this.board[this.numRow - row][col - 1];
	}

	setBoardSpace(col, row, val) {
		this.board[this.numRow - row][col - 1] = val;
	}
}

module.exports = Board;