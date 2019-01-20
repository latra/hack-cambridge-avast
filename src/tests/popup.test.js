const popup = require('../popup');

test('All data is deleted', () => {
	var x = document.getElementById('time_select').value = "last_month";
	expect(x).toBe((new Date()).getTime() - (1000 * 60 * 60 * 24 * 7 * 4));
});