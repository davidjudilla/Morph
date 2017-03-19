var { concatAll, parseMove } = require('../helper');

test('concatAll - nested arrays', () => {
	var arr = [
		[1,2,3],
		[4,5,6],
		[7,8,9]
	]
	const expected = [1,2,3,4,5,6,7,8,9]

	expect(concatAll(arr)).toEqual(expected);
})

test('parseMove', () => {
	const input = 'C3C4';
	const expected = [3,3,3,4];

	expect(parseMove(input)).toEqual(expected);
})