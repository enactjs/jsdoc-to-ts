import fs from 'fs';
import {glob} from 'glob';
import path from 'path';
import {build} from 'documentation';
import log from 'loglevel';
import prettier from 'prettier';

import {makeParser} from './src/parsers.js';


const sourceExtension = /\.jsx?$/i;

function isScript (filePath) {
	return filePath.match(sourceExtension) != null;
}

async function parse ({path: modulePath, files, format, importMap, output}) {
	const encodeModule = await makeParser();

	if (!files || files.length === 0) {
		log.info(`No source files found for ${modulePath}.`);
		return;
	}

	log.info(`Parsing ${modulePath} ...`);
	build(files, {shallow: true}).then(
		async (root) => {
			let result = (await encodeModule({root, section: root, parent: root, importMap, log})).join('\n');
			const firstNamedEntry = root.find(entry => entry.name);
			let moduleName = firstNamedEntry ? firstNamedEntry.name : '';

			if (!result.replace(/\s/g, '').length) {
				return;
			}

			if (format) {
				result = await prettier.format(result, {parser: 'typescript'});
			}

			output(moduleName, result);
		}
	).catch((err) => {
		log.error(`Unable to process ${modulePath}: ${err}`);
		log.error(err.stack);
	});
}

function getSourceFiles (base, ignore) {
	return new Promise((resolve, reject) => {
		glob('**/package.json', {cwd: base}).then(files  => {

			const entries = files
				.filter(name => !ignore.find(i => name.includes(i)))
				.map(relativePackageJsonPath => {
					const packageJsonPath = path.join(base, relativePackageJsonPath);
					const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
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
		}).catch(error => {
			reject(error);
		});
	});
}

function isRequired (name) {
	throw new Error(`${name} is a required argument`);
}

export default function main ({
	output = isRequired('output'),
	ignore = ['node_modules', 'build', 'dist', 'coverage'],
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
