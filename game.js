var rlSync = require('readline-sync');

var layout = require('./layout');
var Board = require('./board');

var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
var numCol = 6;
var numRow = 8;

class Game {
	constructor() {
		this.board = new Board(numCol, numRow);

		this.gameover = false;
		this.numPlayers = rlSync.question('Morph> How many players? (1 or 2) ');
		this.oppName = (this.numPlayers == 1) ? "I" : "Player 2";

		this.board.printBoard();
		this.currPlayer = 0;
		// Math.round(Math.random())
		if (this.currPlayer == 0) { console.log("You go first! ^_^"); } else { console.log(`${this.oppName} go first! ^_^`);}
	}

	play() {
		while(this.gameover != true) {
			this.playMove(this.currPlayer);
			this.isGameOver();
		}
	}

	playMove(currPlayer) {
		if (currPlayer == 0) {
			let move = rlSync.question('Player 1> Enter a move (Ex. C3C4): ')
			if (this.validateMove(move)) {
				this.currPlayer ^= 1;
			} else {
				console.log("That wasn't a legal move! (╯°□°）╯︵ ┻━┻  TRY AGAIN");
			}
		} else if (currPlayer != 0 && this.numPlayers > 1) {
			let move = rlSync.question('Player 2> Enter a move (Ex. C3C4): ')
			if (this.validateMove(move)) {
				this.currPlayer ^= 1;
			} else {
				console.log("That wasn't a legal move! (╯°□°）╯︵ ┻━┻  TRY AGAIN");
			}
		} else {
			this.generateMove();
			this.currPlayer ^= 1;
		}
		this.board.printBoard();
	}

	validateMove(move) {
		if(move.length != 4) {
			console.warn("This input isn't the right length ")
			return false
		}

		let [origCol, origRow] = [...move.slice(0,2)];
		let [destCol, destRow] = [...move.slice(2)];
		origCol = letters.indexOf(origCol.toUpperCase()) + 1;
		destCol = letters.indexOf(destCol.toUpperCase()) + 1;
		origRow = Number(origRow);
		destRow = Number(destRow);

		let piece = this.board.getBoardSpace(origCol, origRow);
		if (piece.player != this.currPlayer) {
			console.log("This piece isn't yours! ಠ_ಠ")
			return false;
		}
		let validMoves = piece.getMoves(this.board);
		console.log("Valid moves: " + validMoves.map(move => letters[Number(move[0]) - 1] + move[1]));
		console.log(`Your input ${letters[destCol-1]}${destRow}`);
		if (validMoves.includes(`${destCol}${destRow}`)) {
			this.board.setBoardSpace(destCol, destRow, piece);
			piece.move(destCol, destRow)
			this.board.setBoardSpace(origCol, origRow, 0);
			return true;
		}
		return false;
	}

	generateMove() {
		
	}

	isGameOver() {
		return false
	}
}

module.exports = Game


