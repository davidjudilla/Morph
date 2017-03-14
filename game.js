var rlSync = require('readline-sync');
var colors = require('colors');

var layout = require('./layout');
var Board = require('./board');

var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
var numCol = 6;
var numRow = 8;

class Game {
	constructor() {
		this.board = new Board(numCol, numRow);

		this.numPlayers = rlSync.question('Morph> How many players? (1 or 2) ');
		this.name0 = (this.numPlayers == 1) ? "You" : "Player 1"; 
		this.name1 = (this.numPlayers == 1) ? "I" : "Player 2";

		this.board.printBoard();
		this.currPlayer = Math.round(Math.random());
		if (this.currPlayer == 0) { console.log(`${this.name0} go first! ^_^`); } else { console.log(`${this.name1} go first! ^_^`);}

		this.gameover = false;
		this.winner;
	}

	play() {
		while(this.isGameOver(this.board) != true) {
			this.playMove(this.currPlayer);
			// this.isGameOver(this.board);
		}
		var winner = this.winner ? this.name1 : this.name0;
		console.log(`${winner.toUpperCase()} IS THE WINNER`.rainbow.bold)
	}

	playMove(currPlayer) {
		if (currPlayer == 0) {
			let move = rlSync.question('Player 1> Enter a move (Ex. C3C4): ')
			if (this.validateMove(move)) {
				this.currPlayer ^= 1;
			} else {
				console.log("That wasn't a legal move! (╯°□°）╯︵ ┻━┻  TRY AGAIN".yellow);
			}
		} else if (currPlayer != 0 && this.numPlayers > 1) {
			let move = rlSync.question('Player 2> Enter a move (Ex. C3C4): ')
			if (this.validateMove(move)) {
				this.currPlayer ^= 1;
			} else {
				console.log("That wasn't a legal move! (╯°□°）╯︵ ┻━┻  TRY AGAIN".yellow);
			}
		} else {
			this.generateMove();
			this.currPlayer ^= 1;
		}
		this.board.printBoard();
	}

	validateMove(move) {
		if (move == 'debug') {
			console.log('Starting debugger...'.green)
			while(this.debug(this.board)) {}
			console.log('Debug finished'.green)
			return false;
		}
		if(move.length != 4) {
			console.warn("This input isn't the right length ".yellow)
			return false
		}
		move = move.toUpperCase();

		let [origCol, origRow] = [...move.slice(0,2)];
		let [destCol, destRow] = [...move.slice(2)];
		origCol = letters.indexOf(origCol.toUpperCase()) + 1;
		destCol = letters.indexOf(destCol.toUpperCase()) + 1;
		origRow = Number(origRow);
		destRow = Number(destRow);

		let piece = this.board.getBoardSpace(origCol, origRow);
		if (piece.player != this.currPlayer) {
			console.log("This piece isn't yours! ಠ_ಠ".yellow)
			return false;
		}
		let validMoves = piece.getMoves(this.board);
		console.log(`Valid moves for ${piece.symbol}: ${validMoves.map(move => letters[Number(move[0]) - 1] + move[1])}`);
		console.log(`Your input: ${move}`);
		if (validMoves.includes(`${destCol}${destRow}`)) {
			this.board.setBoardSpace(destCol, destRow, piece);
			piece.move(destCol, destRow);
			this.board.setBoardSpace(origCol, origRow, 0);
			return true;
		}
		return false;
	}

	generateMove() {
		console.log("BEEP BOOP IDK YOU GO");
	}

	isGameOver(board) {
		var kings = this.concatAll(board).filter(piece => piece.constructor.name == 'King');
		if (kings.length == 1) { 
			this.winner = kings[0].player;
			return true;
		}
		// var king0 = kings.filter(king => king.player == 0);
		// var king1 = kings.filter(king => king.player == 1);

		// console.log(king0);
		// console.log(king1);
		return false
	}

	concatAll(board) {
		var flattenedArr = [];
		board.board.forEach(row => {
			flattenedArr.push(...row);
		})
		return flattenedArr;
	}

	debug(board) {
		var target = rlSync.question('Enter target piece: ')
		if (target == 'exit') return false;
		while(target.length != 2) {
			target = rlSync.question('Enter target piece: ')
		}
		var targetCol = letters.indexOf(target[0].toUpperCase()) + 1;
		var targetRow = Number(target[1]);

		var piece = board.getBoardSpace(targetCol, targetRow);
		console.log(`${piece.constructor.name}${(piece.currPiece ? `(Curr: ${piece.currPiece})` : '')} at col: ${piece.col} row: ${piece.row}`);
		if(piece.constructor.name == 'Morph') {
			console.log(piece.offsets[piece.currPiece])
		}
		console.log('Moves: ' + piece.getMoves(this.board));
		return true;
	}
}

module.exports = Game


