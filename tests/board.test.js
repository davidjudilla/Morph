const Board = require('../board');
const { concatAll } = require('../helper');

const testBoard = new Board(6,8);

test('Board filled w 0s', () => {
	const initBoard = concatAll(testBoard.createBoard());

	expect(initBoard.every(x => x == 0)).toBeTruthy();
})

describe('All pieces in position', () => {
	test('number of 0s', () => {
		const numOfZeros = concatAll(testBoard.board).reduce((count,curr, i) => {
			if (curr == 0){ return count + 1; } else { return count; }
		}, 0)
		expect(numOfZeros).toBe(30);
	})
});

describe('Make/Undo Pawn Move', () => {
	test('makeMove', () => {
		const pawn = testBoard.getBoardSpace(3,3);
		testBoard.makeMove(pawn, 3, 4)
		expect(pawn.col).toBe(3);	
		expect(pawn.row).toBe(4);	
		expect(testBoard.getBoardSpace(3,4)).toEqual(pawn);
		expect(testBoard.getBoardSpace(3,3)).toEqual(0);
	})

	test('undoMove', () => {
		const pawn = testBoard.getBoardSpace(3,4);
		testBoard.undoMove(pawn, 3,3);
		expect(pawn.col).toBe(3);
		expect(pawn.row).toBe(3);
		expect(testBoard.getBoardSpace(3,3)).toEqual(pawn);
		expect(testBoard.getBoardSpace(3,4)).toEqual(0);
	})
});

describe('Make/Undo Knight Move', () => {
	test('makeMove', () => {
		const knight = testBoard.getBoardSpace(6,2);
		testBoard.makeMove(knight, 5,4)

		expect(knight.col).toBe(5);	
		expect(knight.row).toBe(4);	
		expect(knight.currPiece).toEqual('R');

		expect(testBoard.getBoardSpace(5,4)).toEqual(knight);
		expect(testBoard.getBoardSpace(6,2)).toEqual(0);
	})

	test('undoMove', () => {
		const knight = testBoard.getBoardSpace(5,4);
		testBoard.undoMove(knight, 6,2);

		expect(knight.col).toBe(6);
		expect(knight.row).toBe(2);
		expect(knight.currPiece).toEqual('N');

		expect(testBoard.getBoardSpace(6,2)).toEqual(knight);
		expect(testBoard.getBoardSpace(5,4)).toEqual(0);
	})
});