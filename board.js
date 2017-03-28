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
				this.setBoardSpace(col, row, new pieceConstr(col, row, 0))
				this.setBoardSpace(oppCol, oppRow, new pieceConstr(oppCol, oppRow, 1))
			})
		});
	}

	printBoard() {
		console.log(this.board.map((row,i) => {
			return [this.numRow - i, ...row.map(square => square.symbol ? square.symbol : '-')].join(' ')
		}).join('\n'))
		console.log('  ' + letters.join(' '));
		console.log(new Array(15).fill('-').join('') + "\n");
	}

	getBoardSpace(col, row) {
		if (row < 1 || row > 8 || col < 1 || col > 8) return undefined;
		return this.board[this.numRow - row][col - 1];
	}

	setBoardSpace(col, row, val) {
		this.board[this.numRow - row][col - 1] = val;
	}

	makeMove(piece, col, row) {
		this.setBoardSpace(col, row, piece);
		if (piece != 0) {
			this.setBoardSpace(piece.col, piece.row, 0);
			piece.move(parseInt(col), parseInt(row));
		}
	}

	undoMove(piece, targetCol, targetRow) {
		this.setBoardSpace(targetCol, targetRow, piece);
		if (piece != 0) {
			// if (piece.constructor.name == "Morph") {
			// 	piece.col = targetCol; 
			// 	piece.row = targetRow; 
			// 	// console.log('undo morph');
			// 	debugger;
			// 	piece.undo();
			// } else {
			// 	piece.move(targetCol, targetRow);
			// }
			piece.move(targetCol, targetRow);
		}
	}
}

module.exports = Board;