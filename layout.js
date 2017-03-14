const King = require('./pieces/king');
const Pawn = require('./pieces/pawn');
const Morph = require('./pieces/morph');

const Knight = Morph.bind(this, "N");
const Rook = Morph.bind(this, "R");
const Bishop = Morph.bind(this, "B");

module.exports = {
	"king": {
		"pieceConstr" : King,
		"spaces" : [
			{ row : 1, col: 5}
		]
	},
	"pawn": {
		"pieceConstr" : Pawn,
		"spaces" : [
			{ row : 3, col: 3},
			{ row : 3, col: 4}
		]	
	},
	"knight": {
		"pieceConstr" : Knight,
		"spaces" : [
			{ row : 2, col: 1},
			{ row : 2, col: 6}
		]	
	},
	"rook": {
		"pieceConstr" : Rook,
		"spaces" : [
			{ row : 2, col: 3},
			{ row : 2, col: 4}
		]	
	},
	"bishop": {
		"pieceConstr" : Bishop,
		"spaces" : [
			{ row : 2, col: 2},
			{ row : 2, col: 5}
		]	
	},
}