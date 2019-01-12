const fs = require('fs');
const glob = require('glob');
const path = require('path');
const documentation = require('documentation');
const log = require('loglevel');
const prettier = require('prettier');

const {makeParser} = require('./src/parsers');

const sourceExtension = /\.jsx?$/i;

function isScript (filePath) {
	return filePath.match(sourceExtension) != null;
}

function parse ({path: modulePath, files, format, importMap, output}) {
	const encodeModule = makeParser();

	if (!files || files.length === 0) {
		log.info(`No source files found for ${modulePath}.`);
		return;
	}

	log.info(`Parsing ${modulePath} ...`);
	documentation.build(files, {shallow: true}).then(
		(root) => {
			let result = encodeModule({root, section: root, parent: root, importMap, log}).join('\n');
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

function getSourceFiles (base, ignore) {
	return new Promise((resolve, reject) => {
		glob('**/package.json', {cwd: base}, (er, files) => {
			if (er) {
				reject(er);
				return;
			}

			const entries = files
				.filter(name => !ignore.find(i => name.includes(i)))
				.map(relativePackageJsonPath => {
					const packageJsonPath = path.join(base, relativePackageJsonPath);
					const pkg = require(packageJsonPath);
					const dirPath = path.dirname(path.resolve(path.dirname(packageJsonPath), pkg.main));

					return {
						package: pkg,
						path: path.relative(base, dirPath),
						files: fs.readdirSync(dirPath)
							.map(p => path.join(dirPath, p))
							.filter(isScript)
					};
				});

			resolve(entries);
		});
	});
}

function isRequired (name) {
	throw new Error(`${name} is a required argument`);
}

function main ({
	output = isRequired('output'),
	ignore = ['node_modules'],
	package: base = isRequired('package'),
	format = true,
	importMap,
	logLevel = 'error',
	outputPath
}) {
	log.setLevel(logLevel);

	getSourceFiles(path.resolve(base), ignore).then(files => {
		files.forEach(moduleEntry => {
			parse({
				...moduleEntry,
				format,
				importMap,
				output: (moduleName, result) => {
					const file = path.basename(moduleEntry.package.main.replace(sourceExtension, '.d.ts'));
					output(
						path.join(path.resolve(outputPath || base), moduleEntry.path, file),
						result
					);
				}
			});
		});
	});
}

module.exports = main;
