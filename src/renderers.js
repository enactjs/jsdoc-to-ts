
/**
 * Rendering functions and the default set of renderers
 */
import {escapeClassMember, hasRequiredTag} from './utils.js';
import {renderDescription} from './description.js';
import {renderParam} from './params.js';
import {renderType, extractTypeImports} from './types.js';

function isExports (tag) {
	return tag.title === 'exports';
}

function exportDeclarations (moduleName) {
	return function (tag) {
		if (tag.description === moduleName) {
			return `export default ${tag.description}`;
		} else if (tag.description.indexOf('default ') === 0) {
			const name = tag.description.slice(8);
			return `export default ${name}`;
		}

		return '';
	};
}

export function defaultModuleRenderer ({section, parent, root, importMap, log, renderer}) {
	if (parent !== root) {
		log.warn(`Unexpected module ${section.name}`);
		return;
	}

	const moduleName = section.name.replace(/^.*\//g, '');
	const imports = {
		add: function (entry) {
			if (this.entries.find(e => (
				e.module === entry.module &&
				e.path === entry.path &&
				e.name === entry.name
			))) return;

			this.entries.push(entry);
		},
		isLocal: function (entry) {
			return entry.indexOf(section.name) === 0;
		},
		entries: []
	};

	if (!section.tags.filter(isExports).length) {
		log.warn(`No @exports found in ${moduleName}`);
	}

	const body = `
		${
			renderer({section: section.members.static, imports, export: true})
				.filter(Boolean)
				.join('\n')
		}

		${
			section.tags
				.filter(isExports)
				.map(exportDeclarations(moduleName))
				.join('')
		}
	`;

	const header = `
		// Type definitions for ${section.name}

		${imports.entries.map(entry => {
			const path = `${importMap && importMap[entry.module] || entry.module}${entry.path ? `/${entry.path}` : ''}`;
			let spec = '';

			if (entry.name) {
				if (entry.all) {
					spec = `* as ${entry.alias || entry.name}`;
				} else {
					const name = entry.alias ? `${entry.name} as ${entry.alias}` : entry.name;
					spec = `{ ${name} }`;
				}
			}

			return `import ${spec} from "${path}";`;
		}).join('\n')}

		type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
		type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
	`;

	return `${header}${body}`;
}

function uniq (arr) {
	return arr.reduce((r, v) => {
		if (!r.includes(v)) {
			r.push(v);
		}

		return r;
	}, []);
}

function permute (base) {
	if (base === 0) {
		return [];
	}

	const result = [String(base)];

	for (let i = 1; i < base; i++) {
		const lower = permute(i);
		const upper = permute(base - i);
		lower.forEach(l => upper.forEach(u => {
			const v = l + u;
			if (!result.includes(v)) {
				result.push(v);
			}
		}));
	}

	return uniq(result);
}

function permuteParameters (parameters) {
	return permute(parameters.length)
		.map(s => Array.from(s, Number))
		.map(counts => {
			const params = parameters.slice();
			return counts.map(c => params.splice(0, c));
		});
}

function formatParameters (parameters, placeholders, typeRenderer) {
	const output = parameters.map(({name, type}) => {
		if (!type) {
			return 'any';
		}

		const rest = type.type === 'RestType' ? '...' : '';

		let optional = '';
		if (type.type === 'OptionalType') {
			optional = '?';
			type = type.expression;
		}

		return `${rest}${name}${optional}: ${typeRenderer(type, placeholders)}`;
	}).join(', ');

	return `(${output})`;
}

const formatFunction = (section, exp, instance, name, templates, params, ret) => {
	return renderDescription(section) +
			(exp ? 'export ' : '') +
			(instance ? '' : 'function ') +
			`${name}${templates}${params}: ${ret};`;
};

export function defaultFunctionRenderer ({section, export: exp = false, instance = false, typeRenderer = renderType}) {
	let returns = 'void';

	const parameters = section.params;
	const placeholders = section.tags
		.filter(tag => tag.title === 'template')
		.map(tag => tag.description);
	const parametersOutput = formatParameters(parameters, placeholders, typeRenderer);

	if (section.returns.length && section.returns[0].type) {
		returns = typeRenderer(section.returns[0].type, placeholders);
	}

	const templates = placeholders.length === 0 ? '' : `<${placeholders.join(', ')}>`;

	if (section.tags.find(t => t.title === 'curried')) {
		return permuteParameters(parameters).map(params => {
			const first = formatParameters(params[0], placeholders, typeRenderer);
			if (params.length === 1) {
				return formatFunction(section, exp, instance, section.name, templates, first, returns);
			}

			const formattedParams = params.slice(1).map(p => formatParameters(p, placeholders, typeRenderer)).join(' => ');
			const ret = `${formattedParams} => ${returns}`;
			return formatFunction(section, exp, instance, section.name, templates, first, ret);
		}).join('\n');
	}

	return formatFunction(section, exp, instance, section.name, templates, parametersOutput, returns);
}

function defaultConstantRenderer ({section, export: exp, renderer}) {
	const declaration = `${renderDescription(section)}${exp ? 'export ' : ''}declare const ${section.name}:`;
	if (section.members.static.length === 0) {
		return `${declaration} ${renderType(section.type)};`;
	}

	return `${declaration} {
		${
			renderer({section: section.members.static, instance: true})
				.filter(Boolean)
				.join('\n')
		}
	};`;
}

function renderInterface (name, members, interfaceBase, typeRenderer, imports, omits) {
	if (interfaceBase && omits && omits.length) {
		const omitString = '"' + omits.join('"|"') + '"';
		interfaceBase = `Omit<${interfaceBase}, ${omitString}>`;
	}

	return `export interface ${name} ${interfaceBase ? `extends ${interfaceBase}` : ''} {
		${members.map(member => {
			const required = hasRequiredTag(member) ? '' : '?';
			extractTypeImports(member.type, imports);
			return `${renderDescription(member)}${escapeClassMember(member.name)}${required}: ${typeRenderer(member.type)};`;
		}).join('\n')}
	}`;
}

function calcPropsBaseName ({imports, section}) {
	return [
		...section.augments.map(a => a.name),
		...section.tags.filter(t => t.title === 'mixes').map(t => t.name)
	].map(name => {
		if (name.indexOf(section.memberof) === 0) {
			// if within the same submodule, no import required
			return name.replace(/^.*[~.]/, '') + 'Props';
		}

		const importMatch = name.match(/(\w+?)\/(\w+)\.(\w+)/i);
		if (importMatch) {
			const alias = name.replace(/[/.]/g, '_') + 'Props';
			imports.add({
				module: importMatch[1],
				path: importMatch[2],
				name: importMatch[3] + 'Props',
				alias
			});

			return alias;
		}

		return false;
	}).filter(Boolean).reduce((output, name) => {
		if (!output) {
			return name;
		} else {
			return `Merge<${output}, ${name}>`;
		}
	}, '');
}

export function defaultHocRenderer ({section, imports, typeRenderer = renderType}) {
	const props = section.members.instance.filter(member => !member.kind);
	const config = section.members.static.find(member => member.tags.find(tag => tag.title === 'hocconfig'));
	const hasConfig = config && config.members.static.length > 0;

	const propsBase = calcPropsBaseName({imports, section});
	const propsInterfaceName = `${section.name}Props`;
	const propsInterface = renderInterface(propsInterfaceName, props, propsBase, typeRenderer);

	const configInterfaceName = `${section.name}Config`;
	const configInterface = !hasConfig ? '' : renderInterface(configInterfaceName, config.members.static, 'Object', typeRenderer);

	const returnType = `React.ComponentType<P & ${propsInterfaceName}>`;
	return `${configInterface}
		${propsInterface}
		export function ${section.name}<P>(
			${hasConfig ? `config: ${configInterfaceName},` : ''}
			Component: React.ComponentType<P> | string
		): ${returnType};
		${!hasConfig ? '' : `
			export function ${section.name}<P>(
				Component: React.ComponentType<P> | string
			): ${returnType};
		`}
	`;
}

// TODO: Add some hinting so we can derive the proper HTML Element to base props on (e.g. Input -> HTMLInputElement)
function defaultComponentRenderer ({section, renderer, imports, typeRenderer = renderType}) {
	const props = section.members.instance.filter(member => !member.kind);
	const funcs = section.members.instance.filter(member => member.kind === 'function');

	const omits = section.tags.reduce((res, tag) => tag.title === 'omit' ? res.concat(tag.description) : res, []);
	const propsBase = calcPropsBaseName({imports, section});
	const propsInterfaceName = `${section.name}Props`;
	const propsInterface = renderInterface(propsInterfaceName, props, propsBase, typeRenderer, imports, omits);

	imports.add({
		module: 'react',
		name: 'React',
		all: true
	});

	return `${propsInterface}
		${renderDescription(section)}
		export class ${section.name} extends React.Component<Merge<React.HTMLProps<HTMLElement>, ${propsInterfaceName}>> {
			${
				renderer({section: funcs, export: false, instance: true})
					.filter(Boolean)
					.join('\n')
			}
		}
	`;
}

function defaultClassRenderer ({section, export: exp, renderer}) {
	return `
		${renderDescription(section)}
		${exp ? 'export ' : ''}declare class ${section.name} {
			${section.constructorComment ? (
			`constructor(${section.constructorComment.params.map(prop => renderParam(prop, renderType)).join(', ')});`
		) : ''}
		${
			renderer({section: section.members.instance, instance: true})
				.filter(Boolean)
				.join('\n')
		}
	};\n`;
}

function defaultTypedefRenderer ({section, export: exp}) {
	let outputStr;

	if (section.type.name === 'Object') {
		outputStr = `${exp ? 'export ' : ''}interface ${section.name} {
			${section.properties.map(prop => renderParam(prop, renderType)).join(',')}
		}`;
	} else if (section.type.name === 'Function') {
		const params = section.params.map(prop => renderParam(prop, renderType)).join(', ');
		const ret = section.returns.length === 0 ? 'void' : renderType(section.returns[0]);
		outputStr = `${exp ? 'export ' : ''}interface ${section.name} { (${params}): ${ret}; }`;
	} else if (section.type.type) {
		outputStr = `${exp ? 'export ' : ''}type ${section.name} = ${renderType(section.type)}`;
	} else {
		outputStr = `${exp ? 'export ' : ''}type ${section.name} = ${section.type.name}`;
	}

	return `${renderDescription(section)}${outputStr}`;
}

const defaultRenderers = {
	'class': defaultClassRenderer,
	'module': defaultModuleRenderer,
	'function': defaultFunctionRenderer,
	'constant': defaultConstantRenderer,
	'component': defaultComponentRenderer,
	'hoc': defaultHocRenderer,
	'typedef': defaultTypedefRenderer,
	'member': defaultConstantRenderer
};

export function getDefaultRenderers (overrides = {}) {
	return Object.assign({}, defaultRenderers, overrides);
}
