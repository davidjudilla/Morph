var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

module.exports = {
	concatAll(arr) {
		var flattenedArr = [];
		arr.forEach(x => {
			flattenedArr.push(...x);
		})
		return flattenedArr;
	},

	parseMove(move) {
		move = move.toUpperCase();

		let [origCol, origRow] = [...move.slice(0,2)];
		let [destCol, destRow] = [...move.slice(2)];
		origCol = letters.indexOf(origCol.toUpperCase()) + 1;
		destCol = letters.indexOf(destCol.toUpperCase()) + 1;
		origRow = Number(origRow);
		destRow = Number(destRow);

		return [origCol, origRow, destCol, destRow];
	},
}