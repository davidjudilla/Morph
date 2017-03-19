var { concatAll, parseMinimaxMove } = require('./helper');

class Minimax {
	static makeMove(game) {
		this.board = game.board;
		this.isGameOver = game.isGameOver;
		this.maxDepth = 5;

		var depth = 0;
		var maxDepth = 5;
		var score;
		var best = Number.MAX_SAFE_INTEGER;
		var bMove;

		var opponentPieces = concatAll(board.board).filter(piece => piece.player == 1);

		var allOppMoves = opponentPieces.map(piece => {
			// let pieceMoves = piece.getMoves(board);
			let allPieceMoves = piece.getMoves(board).map(move => {
				// `${piece.col}${piece.row}${move[0]}${move[1]}`
				return [piece.col, piece.row, move[0], move[1]]
			})
			return allPieceMoves;
		})
		allOppMoves = concatAll(allOppMoves);

		allOppMoves.forEach(move => {
			let [origCol, origRow, destCol, destRow] = move;
			let piece = board.getBoardSpace(origCol, origRow);
			board.makeMove(piece, destCol, destRow);
			score = this.min(depth + 1);
			if(score > best) { bMove = move; best = score; }
			board.undoMove(piece, origCol, origRow);

		})
	}

	min(depth) {
		var best = Number.MAX_SAFE_INTEGER;
		var score;
		if (this.isGameOver(this.board)) return this.isGameOver(this.board);
		if (depth == this.maxDepth) return this.evaluate(game.board);

		var humanPieces = concatAll(board.board).filter(piece => piece.player == 0);
		var allHumanMoves = humanPieces.map(piece => {
			// let pieceMoves = piece.getMoves(board);
			let allPieceMoves = piece.getMoves(board).map(move => {
				// `${piece.col}${piece.row}${move[0]}${move[1]}`
				return [piece.col, piece.row, move[0], move[1]]
			})
			return allPieceMoves;
		})
		allHumanMoves = concatAll(allHumanMoves);

		allHumanMoves.forEach(move => {
			let [origCol, origRow, destCol, destRow] = move;
			let piece = board.getBoardSpace(origCol, origRow);
			board.makeMove(piece, destCol, destRow);
			score = this.max(depth + 1);
			if(score > best) { bMove = move; best = score; }
			board.undoMove(piece, origCol, origRow);

		})

	}

	max(depth) {
		var best = Number.MIN_SAFE_INTEGER;
		var score;
		if (this.isGameOver(this.board)) return this.isGameOver(this.board);
		if (depth == this.maxDepth) return this.evaluate(game.board);

		var opponentPieces = concatAll(board.board).filter(piece => piece.player == 1);

		var allOppMoves = opponentPieces.map(piece => {
			// let pieceMoves = piece.getMoves(board);
			let allPieceMoves = piece.getMoves(board).map(move => {
				// `${piece.col}${piece.row}${move[0]}${move[1]}`
				return [piece.col, piece.row, move[0], move[1]]
			})
			return allPieceMoves;
		})
		allOppMoves = concatAll(allOppMoves);

		allOppMoves.forEach(move => {
			let [origCol, origRow, destCol, destRow] = move;
			let piece = board.getBoardSpace(origCol, origRow);
			board.makeMove(piece, destCol, destRow);
			score = this.min(depth + 1);
			if(score > best) { bMove = move; best = score; }
			board.undoMove(piece, origCol, origRow);

		})
	}
}

module.exports = Minimax;
