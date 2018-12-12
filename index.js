const fs = require('fs');
const path = require('path');
const documentation = require('documentation');
const log = require('loglevel');
const prettier = require('prettier');

const {makeParser} = require('./src/parsers');

const sourceExtension = /\.jsx?$/i;

function isDirectory (filePath) {
	return fs.lstatSync(filePath).isDirectory();
}

function isScript (filePath) {
	return filePath.match(sourceExtension) != null;
}

function excludeModules (filePath) {
	return filePath.indexOf('node_modules') === -1 && filePath.indexOf('internal') === -1;
}

function parse ({path: modulePath, files, format, output}) {
	const encodeModule = makeParser();

	if (!files || files.length === 0) {
		log.info(`No source files found for ${modulePath}.`);
		return;
	}

	log.info(`Parsing ${modulePath} ...`);
	documentation.build(files, {shallow: true}).then(
		(root) => {
			let result = encodeModule({root, section: root, parent: root, log}).join('\n');
			const firstNamedEntry = root.find(entry => entry.name);
			let moduleName = firstNamedEntry ? firstNamedEntry.name : '';

			if (format) {
				result = prettier.format(result, {parser: 'typescript'});
			}

			output(moduleName, result);
		}
	).catch((err) => {
		log.error(`Unable to process ${modulePath}: ${err}`);
	});
}

function getSourceFiles (base) {
	return fs.readdirSync(base)
		.map(dirPath => path.join(base, dirPath))
		.filter(isDirectory)
		.filter(excludeModules)
		.map(dirPath => {
			return {
				path: dirPath,
				files: fs.readdirSync(dirPath)
					.map(p => path.join(dirPath, p))
					.filter(isScript)
					.filter(excludeModules)
			};
		});
}

function main ({package: base, logLevel = 'error', format, output, outputPath}) {
	log.setLevel(logLevel);

	getSourceFiles(base).forEach(moduleEntry => {
		outputPath = outputPath || path.dirname(moduleEntry.path);
		parse({
			...moduleEntry,
			format,
			output: (moduleName, result) => {
				const file = `${moduleName || path.basename(moduleEntry.path).replace(sourceExtension, '')}.d.ts`;
				output(path.join(outputPath, file), result);
			}
		});
	})
}

main({
	logLevel: 'info',
	package: '../enact/packages/spotlight',
	format: true,
	output: (p, s) => fs.writeFileSync(p, s)
});