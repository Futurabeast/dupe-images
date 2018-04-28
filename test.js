function isMD5(x) {
	return /^[0-9a-f]{32}/.test(x);
}
require('./dupe-image-remover')('./folder', {
	recursive: false,
	exact: false,
	tolerance: 0.005,
	rename: true,
	namePreference(n1, n2) {
		return isMD5(n1) ? n1 : isMD5(n2) ? n2 : n1.length > n2.length ? n1 : n2;
	}
}).then(results => {
	require('fs').writeFile('./results.json', JSON.stringify(results), function(err) {
		if (err) console.log(results);
		else console.log('Data saved to results.json');
	});
});
