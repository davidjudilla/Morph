var rlSync = require('readline-sync');

var layout = require('./layout');
var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
var numCol = 6;
var numRow = 8;

class Game {
	constructor() {
		this.board = this.createBoard();
		this.fillWithPieces(this.board, layout);

		// console.log(this.board[6][1]);
		console.log(this.getBoardSpace(2,2));
		this.gameover = false;
		this.numPlayers = rlSync.question('Morph> How many players? (1 or 2) ');
		// You're player 1
		this.currPlayer = Math.ceil(Math.random() * 2)
	}

	createBoard() {
		var row = Array(numCol).fill(0)
		var board = [];
		for (var i = 0; i < numRow; i++) { board.push(row.slice()); }
		return board;
	}

	fillWithPieces(board, layout) {
		let layoutKeys = Object.keys(layout)

		layoutKeys.forEach(pieceConfig => {
			let { pieceConstr, spaces } = layout[pieceConfig]

			spaces.forEach(space => {
				let { row, col } = space;

				let [oppRow, oppCol] = [numRow - row + 1, numCol - col + 1] 
				this.setBoardSpace(col, row, new pieceConstr(row, col, "human"))
				this.setBoardSpace(oppCol, oppRow, new pieceConstr(oppRow, oppCol, "opponent"))
			})
		});
	}

	printBoard() {
		console.log(this.board.map((row,i) => {
			return [numRow - i, ...row.map(square => square.symbol ? square.symbol : '-')].join(' ')
		}).join('\n'))
		console.log('  ' + letters.join(' '));
	}

	play() {
		while(this.gameover != true) {
			this.playMove();
			this.isGameOver();
		}
	}

	playMove() {
		let move = rlSync.question('Morph> Enter a move (Ex. C6C5): ')
		this.validateMove(move);
	}

	validateMove(move) {
		if(move.length > 4) {
			console.warn("This input isn't the right length ")
			return false
		}

		let [origCol, origRow] = [...move.slice(0,2)];
		let [destCol, destRow] = [...move.slice(2)];
		origCol = letters.indexOf(origCol);
		destCol = letters.indexOf(destCol);
		origRow = numRow - origRow;
		destRow = numRow - destRow;

		console.log(origRow, origCol)
		let piece = this.board[origRow][origCol]
		console.log(piece);
		let validMoves = piece.getMoves(this.board);
	}

	getBoardSpace(col, row) {
		return this.board[numRow - row][col - 1];
	}

	setBoardSpace(col, row, val) {
		this.board[numRow - row][col - 1] = val;
	}

	isGameOver() {
		return false
	}
}

module.exports = Game


