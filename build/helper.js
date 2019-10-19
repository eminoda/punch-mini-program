const path = require('path');
const fs = require('fs');

const developDirtory = path.join(__dirname, '../src');

const buildEntry = function(dir) {
	let entry = {};
	const { pages } = require(path.join(dir, 'app.json'));
	pages.map((val, index) => {
		let jsPath = val;
		let key = val.split('/').reverse()[0];
		entry[key] = path.join(dir, `${jsPath}.js`);
	});
	return entry;
};

let entry = buildEntry(developDirtory);

module.exports = { entry };
