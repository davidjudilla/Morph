class Morph {
	constructor(initPiece, col, row, player) {
		this.pieceFlow = ['B', 'N', 'R'];
		this.flowIndex = this.pieceFlow.indexOf(initPiece.toUpperCase());
		this.row = row;
		this.col = col;
		this.player = player;
		this.offsets = {
			'B': [
				// neg index 1 is a backwards move
				[1,1],
				[-1,1],
				[1,-1],
				[-1,-1]
			],
			'N': [
				// forward
				[1,2],
				[-1,2],
				[2,1],
				[-2,1],
				// backward
				[1,-2],
				[-1,-2],
				[2,-1],
				[-2,-1],
			],
			'R': [
				[1,0],
				[-1,0],
				[0,1],
				[0,-1]
			],
		}
	}

	get symbol() {
		return (this.player == 0) ? 
			this.pieceFlow[this.flowIndex].toLowerCase() : 
			this.pieceFlow[this.flowIndex].toUpperCase();	
	}

	get currPiece() {
		return this.pieceFlow[this.flowIndex];
	}

	move(col, row) {
		this.row = row;
		this.col = col;
		this.flowIndex = (this.flowIndex + 1) % this.pieceFlow.length
	}

	undo() {
		this.flowIndex = this.flowIndex - 1;
		if (this.flowIndex < 0) this.flowIndex = 2;
	}

	getMoves(board) {
		let moves = [];
		let currPieceOffsets = this.offsets[this.currPiece];

		currPieceOffsets.forEach(offset => {
			if (this.currPiece != 'N') {
				moves.push(...this.getMovesInLine(board, offset))
			} else {
				let target = board.getBoardSpace(this.col + offset[0], this.row + offset[1]);

				if (target == undefined || target.player == this.player) return;
				// target is moving forward, or backwards capture = push
				// check which player is moving and correct orientation
				if (this.player == 0) {
					if ((offset[1] >= 0) || (offset[1] < 0 && target.player == !this.player)){ 
						moves.push(`${this.col + offset[0]}${this.row + offset[1]}`);
					}
				} else {
					if ((offset[1] <= 0) || (offset[1] > 0 && target.player == !this.player)){ 
						moves.push(`${this.col + offset[0]}${this.row + offset[1]}`);
					}
				}
			}

		})
		moves = moves.filter(move => {
			let target = board.getBoardSpace(move[0], move[1]);
			return target != undefined;
		});

		return moves
	}

	getMovesInLine(board, offset) {
		let moves = [];
		let count = 1;
		let getNextSpace = () => board.getBoardSpace(this.col + (offset[0]*count), this.row + (offset[1]*count));

		let next = getNextSpace();
		// console.log('offset:', offset);
		while(next != undefined) {
			// Can't take your own pieces
			if (next.player == this.player) break;
			// If moving forward/sideways or backwards capturing an enemy
			if (this.player == 0) {
				if (offset[1] >= 0 || (offset[1] < 0 && next.player == !this.player)) moves.push(`${this.col + (offset[0]*count)}${this.row + (offset[1]*count)}`);
			} else {
				if (offset[1] <= 0 || (offset[1] > 0 && next.player == !this.player)) moves.push(`${this.col + (offset[0]*count)}${this.row + (offset[1]*count)}`);
			}
			if(next != 0) break;

			count++;
			next = getNextSpace();
		}
		// console.log('moves', moves);
		return moves;
	}

	toString() {
		return `${this.constructor.name} ${this.currPiece} col:${this.col} row:${this.row} p:${this.player}`
	}
}

module.exports = Morph;