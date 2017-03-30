var { concatAll, parseMinimaxMove, deepClone } = require('./helper');
const colors = require('colors')
const pieceValues = {
	"K": 1000,
	"N": 3,
	"B": 3,
	"R": 5,
	"P": 1
}

// NOTE FOR LATER: If we do this in parallel we need to make a copy of board since we're
// passing by reference

// class Minimax {
var minimax = {
	makeMove(game, depth = 5) {
		this.board = game.board;
		this.isGameOver = game.isGameOver;
		this.maxDepth = depth;

		var depth = 0;
		var score;
		var best = Number.MIN_SAFE_INTEGER;
		var bMove;

		var opponentPieces = this.getAllOppPieces(this.board.board);
		var allOppMoves = opponentPieces.map(piece => {
			let allPieceMoves = piece.getMoves(this.board).map(move => {
				return [piece.col, piece.row, parseInt(move[0]), parseInt(move[1])]
			})
			return allPieceMoves;
		})
		allOppMoves = concatAll(allOppMoves);

		allOppMoves.forEach(move => {
			let [origCol, origRow, destCol, destRow] = move;
			let piece = this.board.getBoardSpace(origCol, origRow);
			let target = this.board.getBoardSpace(destCol, destRow);

			this.board.makeMove(piece, destCol, destRow);
			score = this.min(depth + 1, best);
			if(score > best) { bMove = move; best = score; }
			
			if (piece.constructor.name == "Morph") { piece.undo(); }
			this.board.undoMove(piece, origCol, origRow);
			this.board.undoMove(target, destCol, destRow);
		})

		return bMove;
	},

	// human
	// finds min of all child moves
	min(depth, alpha) {
		var minBest = Number.MAX_SAFE_INTEGER;
		var score;
		if (this.isGameOver(this.board)) {
			// Add depth because this will be returned to max
			return this.isGameOver(this.board) - depth;
		}
		if (depth == this.maxDepth) { return this.evaluate(this.board); }

		var humanPieces = this.getAllHumanPieces(this.board.board);
		var allHumanMoves = humanPieces.map(piece => {
			let allPieceMoves = piece.getMoves(this.board).map(move => {
				return [piece.col, piece.row, parseInt(move[0]), parseInt(move[1])]
			})
			return allPieceMoves;
		})
		allHumanMoves = concatAll(allHumanMoves);

		for (let move of allHumanMoves) {
			let [origCol, origRow, destCol, destRow] = move;
			let piece = this.board.getBoardSpace(origCol, origRow);
			let target = this.board.getBoardSpace(destCol, destRow);
			
			this.board.makeMove(piece, destCol, destRow);
			score = this.max(depth + 1, minBest);
			if(score < minBest) { minBest = score; }
			
			if (piece.constructor.name == "Morph") { piece.undo(); }
			this.board.undoMove(piece, origCol, origRow);
			this.board.undoMove(target, destCol, destRow);

			if (score < alpha) {
				return minBest;
			}
		}

		// allHumanMoves.forEach(move => {
		// })

		return minBest;

	},

	// Opponent
	// finds the max score off all child moves
	max(depth, beta) {
		var maxBest = Number.MIN_SAFE_INTEGER;
		var score;
		if (this.isGameOver(this.board)) {
			return this.isGameOver(this.board) + depth;
		}
		if (depth == this.maxDepth) { return this.evaluate(this.board); }
		
		var opponentPieces = this.getAllOppPieces(this.board.board);
		var allOppMoves = opponentPieces.map(piece => {
			let allPieceMoves = piece.getMoves(this.board).map(move => {
				return [piece.col, piece.row, parseInt(move[0]), parseInt(move[1])]
			})
			return allPieceMoves;
		})
		allOppMoves = concatAll(allOppMoves);

		for(let move of allOppMoves) {
			let [origCol, origRow, destCol, destRow] = move;
			let piece = this.board.getBoardSpace(origCol, origRow);
			let target = this.board.getBoardSpace(destCol, destRow);

			this.board.makeMove(piece, destCol, destRow);
			score = this.min(depth + 1, maxBest);
			if(score > maxBest) { maxBest = score; }
			
			if (piece.constructor.name == "Morph") { piece.undo(); }
			this.board.undoMove(piece, origCol, origRow);
			this.board.undoMove(target, destCol, destRow);

			if (score > beta) {
				return maxBest;
			}
		}

		// allOppMoves.forEach(move => {
		// })

		return maxBest;
	},

	getAllHumanPieces(board) {
		return concatAll(board).filter(piece => {
			if (piece == 0 || piece == undefined) return false;
			return piece.player == 0;
		});
	},

	getAllOppPieces(board) {
		return concatAll(board).filter(piece => {
			if (piece == 0 || piece == undefined) return false;
			return piece.player == 1;
		});
	},

	evaluate(board) {
		// const humanPieceCount = concatAll(board.board).filter(piece => piece.player == 0).length;
		// const oppPieceCount = concatAll(board.board).filter(piece => piece.player == 1).length;
		// return oppPieceCount - humanPieceCount;
		const humanPieceSum = concatAll(board.board).filter(piece => piece.player == 0).reduce((p,c) => {
			return p + pieceValues[c.symbol.toUpperCase()];
		}, 0);
		const oppPieceSum = concatAll(board.board).filter(piece => piece.player == 1).reduce((p,c) => {
			return p + pieceValues[c.symbol.toUpperCase()];
		}, 0);
		return oppPieceSum - humanPieceSum;
	}
}

module.exports = minimax;
