var rlSync = require('readline-sync');

var layout = require('./layout');
var Board = require('./board');

var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
var numCol = 6;
var numRow = 8;

class Game {
	constructor() {
		this.board = new Board(numCol, numRow);

		console.log(this.board.getBoardSpace(2,2));
		this.gameover = false;
		this.numPlayers = rlSync.question('Morph> How many players? (1 or 2) ');
		// You're player 1
		this.currPlayer = Math.ceil(Math.random() * 2)
	}

	play() {
		this.board.printBoard();
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
		origCol = letters.indexOf(origCol) + 1;
		destCol = letters.indexOf(destCol) + 1;
		// origRow = numRow - origRow;
		// destRow = numRow - destRow;

		console.log(origRow, origCol)
		let piece = this.board.getBoardSpace(origCol, origRow);
		console.log(piece);
		let validMoves = piece.getMoves(this.board.board);
	}

	isGameOver() {
		return false
	}
}

module.exports = Game


