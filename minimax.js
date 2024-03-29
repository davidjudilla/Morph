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
	makeMove(game) {
		this.board = game.board;
		this.isGameOver = game.isGameOver;
		this.maxDepth = 3;

		var depth = 0;
		var maxDepth = 5;
		var score;
		var best = Number.MIN_SAFE_INTEGER;
		var bMove;

		var opponentPieces = concatAll(this.board.board).filter(piece => piece.player == 1);
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
			score = this.min(depth + 1);
			if(score > best) { bMove = move; best = score; }
			this.board.undoMove(piece, origCol, origRow);
			this.board.undoMove(target, destCol, destRow);
		})

		return bMove;
	},

	min(depth) {
		var minBest = Number.MAX_SAFE_INTEGER;
		var score;
		if (this.isGameOver(this.board)) return this.isGameOver(this.board);
		if (depth == this.maxDepth) { return this.evaluate(this.board); }

		var humanPieces = concatAll(this.board.board).filter(piece => piece.player == 0);
		var allHumanMoves = humanPieces.map(piece => {
			let allPieceMoves = piece.getMoves(this.board).map(move => {
				return [piece.col, piece.row, parseInt(move[0]), parseInt(move[1])]
			})
			return allPieceMoves;
		})
		allHumanMoves = concatAll(allHumanMoves);

		allHumanMoves.forEach(move => {
			let [origCol, origRow, destCol, destRow] = move;
			let piece = this.board.getBoardSpace(origCol, origRow);
			let target = this.board.getBoardSpace(destCol, destRow);
			
			this.board.makeMove(piece, destCol, destRow);
			score = this.max(depth + 1);
			if(score < minBest) { minBest = score; }
			this.board.undoMove(piece, origCol, origRow);
			this.board.undoMove(target, destCol, destRow);
		})

		return minBest;

	},

	max(depth) {
		var maxBest = Number.MIN_SAFE_INTEGER;
		var score;
		if (this.isGameOver(this.board)) return this.isGameOver(this.board);
		if (depth == this.maxDepth) { return this.evaluate(this.board); }

		var opponentPieces = concatAll(this.board.board).filter(piece => piece.player == 1);
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
			score = this.min(depth + 1);
			if(score > maxBest) { maxBest = score; }
			this.board.undoMove(piece, origCol, origRow);
			this.board.undoMove(target, destCol, destRow);
		})

		return maxBest;
	},

	evaluate(board) {
		const humanPieceSum = concatAll(board.board).filter(piece => piece.player == 0).reduce((p,c) => {
			return p + pieceValues[c.symbol.toUpperCase()];
		}, 0);
		const oppPieceSum = concatAll(board.board).filter(piece => piece.player == 1).reduce((p,c) => {
			return p + pieceValues[c.symbol.toUpperCase()];
		}, 0);
		debugger;

		return oppPieceSum - humanPieceSum;	
	}
}

module.exports = minimax;
