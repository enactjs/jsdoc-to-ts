const documentation = require('documentation');
const log = require('loglevel');

const {makeParser} = require('./src/parsers');

const path = '../enact/packages/core/kind';

const encodeModule = makeParser();

// TOOD: Make this more useful?
const output = console.log;

documentation.build(path, {shallow: true}).then(
	(root) => encodeModule({root, section: root, parent: root, log, output})
).catch((err) => {
	console.log(`Unable to process ${path}: ${err}`);	// eslint-disable-line no-console
});
