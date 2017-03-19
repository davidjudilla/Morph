var { concatAll, parseMinimaxMove } = require('./helper');

// class Minimax {
module.exports = {
	makeMove(board) {
		var depth = 0;
		var maxDepth = 5;
		var score;
		var best = Number.MAX_SAFE_INTEGER;
		var bMove;

		var humanPieces = concatAll(board.board).filter(piece => piece.player == 0);
		var opponentPieces = concatAll(board.board).filter(piece => piece.player == 1);	

		var allOppMoves = opponentPieces.map(piece => {
			let pieceMoves = piece.getMoves(board);
			let allPieceMoves = pieceMoves.map(move => {
				return `${piece.col}${piece.row}${move[0]}${move[1]}`
			})
			return allPieceMoves;
		})
		allOppMoves = concatAll(allOppMoves);

		allOppMoves.forEach(move => {
			let [origCol, origRow, destCol, destRow] = parseMinimaxMove(move);
			let piece = board.getBoardSpace(origCol, origRow);
			console.log(piece);
			board.makeMove(piece, destCol, destRow);
			score = this.max(depth + 1);
			if(score > best) { bMove = move; best = score; }
			board.undoMove(piece, origCol, origRow);

		})
	},

	min(depth) {

	},

	max (depth) {

	}
}

