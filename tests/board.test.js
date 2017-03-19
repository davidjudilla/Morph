const Board = require('../board');
const { concatAll } = require('../helper');

const testBoard = new Board(6,8);

test('board filled w 0s', () => {
	const initBoard = concatAll(testBoard.createBoard());

	expect(initBoard.every(x => x == 0)).toBeTruthy();
})

describe('all pieces in position', () => {
	test('number of 0s', () => {
		const numOfZeros = concatAll(testBoard.board).reduce((count,curr, i) => {
			if (curr == 0){ return count + 1; } else { return count; }
		}, 0)
		expect(numOfZeros).toBe(30);
	})
});