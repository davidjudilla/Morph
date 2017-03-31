var { question } = require('readline-sync');
var { concatAll, parseMove, boardTranslation } = require('./helper');
var colors = require('colors');

var layout = require('./layout');
var Board = require('./board');
var minimax = require('./minimaxAlphaBeta');

var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
var numCol = 6;
var numRow = 8;

class Game {
	constructor() {
		this.board = new Board(numCol, numRow);

		this.numPlayers = question('Morph> How many players? (1 or 2) ');
		this.name0 = (this.numPlayers == 1) ? "You" : "Player 1";
		this.name1 = (this.numPlayers == 1) ? "I" : "Player 2";

		this.board.printBoard();
		this.currPlayer = Math.round(Math.random());
		if (this.currPlayer == 0) { console.log(`${this.name0} go first! ^_^`); } else { console.log(`${this.name1} go first! ^_^`);}

		this.gameover = false;
		this.winner;
	}

	play() {
		while(this.isGameOver(this.board) == 0) {
			this.playMove(this.currPlayer);
		}
		var winner = this.winner ? this.name1 : this.name0;
		console.log(`${winner.toUpperCase()} ${this.numPlayers == 1 ? 'AM' : 'IS'} THE WINNER`.bold)

	}

	playMove(currPlayer) {
		if (currPlayer == 0) {
			// If player has no moves skip
			let allMoves = this.getAllHumanPieces(this.board.board).map(piece => {
				let allPieceMoves = piece.getMoves(this.board).map(move => {
					return [piece.col, piece.row, parseInt(move[0]), parseInt(move[1])]
				})
				return allPieceMoves;
			})
			allMoves = concatAll(allMoves);
			if (allMoves.length < 1) {
				console.log('You have no moves to play wuahwuahwaaaauh');
				this.currPlayer ^= 1;
				return;
			}
			let move = question('Player 1> Enter a move (Ex. C3C4): ')
			if (this.validateMove(move)) {
				this.currPlayer ^= 1;
			} else {
				console.log("That wasn't a legal move! (╯°□°）╯︵ ┻━┻  TRY AGAIN".yellow);
			}
		} else if (currPlayer != 0 && this.numPlayers > 1) {
			let move = question('Player 2> Enter a move (Ex. C3C4): ')
			if (this.validateMove(move)) {
				this.currPlayer ^= 1;
			} else {
				console.log("That wasn't a legal move! (╯°□°）╯︵ ┻━┻  TRY AGAIN".yellow);
			}
		} else {
			this.generateMove(this.board);
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
		if(move.length == 2) {
			const targetCol = letters.indexOf(move[0].toUpperCase()) + 1;
			const targetRow = parseInt(move[1]);
			const piece = this.board.getBoardSpace(targetCol, targetRow);
			console.log(`Valid moves for ${piece.symbol}: ${piece.getMoves(this.board).map(move => letters[Number(move[0]) - 1] + move[1])}`);
			return false;
		}
		if(move.length != 4) {
			console.warn("This input isn't the right length ".yellow)
			return false
		}

		let [origCol, origRow, destCol, destRow] = parseMove(move);

		let piece = this.board.getBoardSpace(origCol, origRow);
		if (piece.player != this.currPlayer) {
			console.log("This piece isn't yours! ಠ_ಠ".yellow)
			return false;
		}

		let validMoves = piece.getMoves(this.board);
		console.log(`Valid moves for ${piece.symbol}: ${validMoves.map(move => letters[Number(move[0]) - 1] + move[1])}`);
		console.log(`Your input: ${move}`);
		if (validMoves.includes(`${destCol}${destRow}`)) {
			this.board.makeMove(piece, destCol, destRow);
			return true;
		}
		return false;
	}

	generateMove(board) {
		console.log('Let me think...');
		console.time('Total search time');
		const bestMove = this.iterDS(this) // minimax.makeMove(this);
		console.timeEnd('Total search time');

		let [origCol, origRow, destCol, destRow] = bestMove;
		
		var piece = board.getBoardSpace(origCol, origRow);
		this.board.setBoardSpace(destCol, destRow, piece);
		piece.move(destCol, destRow);
		this.board.setBoardSpace(origCol, origRow, 0);

		console.log(`My move is ${letters[origCol - 1]}${origRow}${letters[destCol - 1]}${destRow} (${ boardTranslation(bestMove) })`.yellow);
	}

	iterDS(game) {
		let finalTime = Date.now() + 5000;
		let lastProcTime = 0;
		let depth = 0;
		let bestMove;
		// Trying to predict the processing time and decide to go another ply down 
		while ((Date.now() + (lastProcTime ** 1.3)) < finalTime) {
			// console.log((Date.now() + lastProcTime ** 2));
			// console.log(finalTime);
			let startTime = Date.now();
			bestMove = minimax.makeMove(game, depth + 1);
			let endTime = Date.now();
			lastProcTime = endTime - startTime;

			depth = depth + 1;
			console.log(`IDS (depth: ${depth}): time: ${lastProcTime}ms`);
		}
		return bestMove;
	}

	getBestMove(game, bestMove, time) {
		let promise = new Promise((resolve, reject) => {
			let depth = 0;
			setTimeout(() => {
				console.log('hi');
				resolve(bestMove);
			}, time)

			while(1) {
				bestMove = minimax.makeMove(game, depth + 1);
			}
		})
		return promise;
	}

	isGameOver(board) {
		let allMoves = concatAll(this.board.board).filter(piece => piece != 0).map(piece => {
				let allPieceMoves = piece.getMoves(this.board).map(move => {
					return [piece.col, piece.row, parseInt(move[0]), parseInt(move[1])]
				})
				return allPieceMoves;
		})

		if (allMoves < 1) {
			console.log('ITS A DRAW WTF');
			return true;
		}
		var kings = concatAll(board.board).filter(piece => {
			if(piece == 0 || piece == undefined) return false;
			return piece.constructor.name == 'King';
		})
		if (kings.length == 1) {
			this.winner = kings[0].player;
			// return true;
			return this.winner ? 10000 : -10000;
		}
		// var king0 = kings.filter(king => king.player == 0);
		// var king1 = kings.filter(king => king.player == 1);

		return 0;
	}

	getAllHumanPieces(board) {
		return concatAll(board).filter(piece => {
			if (piece == 0 || piece == undefined) return false;
			return piece.player == 0;
		});
	}

	getAllOppPieces(board) {
		return concatAll(board).filter(piece => {
			if (piece == 0 || piece == undefined) return false;
			return piece.player == 1;
		});
	}

	debug(board) {
		debugger;
		var target = question('Enter target piece: ')
		if (target == 'exit') return false;
		while(target.length != 2) {
			target = question('Enter target piece: ')
		}
		var targetCol = letters.indexOf(target[0].toUpperCase()) + 1;
		var targetRow = Number(target[1]);

		var piece = board.getBoardSpace(targetCol, targetRow);
		if (piece == 0) {
			console.log(`${piece} at ${targetCol} ${targetRow}`);
			return true;
		}
		console.log(`${piece.constructor.name}${(piece.currPiece ? `(Curr: ${piece.currPiece})` : '')} at col: ${piece.col} row: ${piece.row}`);
		if(piece.constructor.name == 'Morph') {
			console.log(piece.offsets[piece.currPiece])
		}
		console.log('Moves: ' + piece.getMoves(this.board));
		console.log('Piece to string:', piece);
		return true;
	}
}

module.exports = Game
