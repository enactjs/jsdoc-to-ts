
/**
 * Rendering functions and the default set of renderers
 */
const {escapeClassMember, hasRequiredTag} = require('./utils');
const {renderDescription} = require("./description");
const {renderParam} = require('./params');
const {renderType, extractTypeImports} = require('./types');

function isExports (tag) {
	return tag.title === 'exports';
}

function exportDeclarations (moduleName) {
	return function (tag) {
		if (tag.description === moduleName) {
			return `export default ${tag.description}`;
		}

		return '';
	};
}

function defaultModuleRenderer ({section, parent, root, importMap, log, renderer, types}) {
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
		entries: []
	};

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
					const name = entry.alias ? `${entry.name} as ${entry.alias}` : entry.name
					spec = `{ ${name} }`;
				}
			}

			return `import ${spec} from "${path}";`
		}).join('\n')}

		type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
		type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
	`;

	return `${header}${body}`;
}

exports.defaultModuleRenderer = defaultModuleRenderer;

function defaultFunctionRenderer ({section, export: exp = false, instance = false, typeRenderer = renderType}) {
	let returns = 'void';

	const placeholders = section.tags
		.filter(tag => tag.title === 'template')
		.map(tag => tag.description);

	const parameters = section.params.map(({name, type}) => {
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
	});

	if (section.returns.length) {
		returns = typeRenderer(section.returns[0].type, placeholders);
	}

	const templates = placeholders.length === 0 ? '' : `<${placeholders.join(', ')}>`;

	return `${renderDescription(section)}${exp ? 'export ' : ''}${instance ? '' : 'function '}${section.name}${templates}(${parameters.join(', ')}): ${returns};`
}

exports.defaultFunctionRenderer = defaultFunctionRenderer;

function defaultConstantRenderer ({section, export: exp, renderer}) {
	const declaration = `${renderDescription(section)}${exp ? 'export ' : ''}declare var ${section.name}:`;
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

exports.defaultConstantRenderer = defaultConstantRenderer;

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
			return name.replace(/^.*[~\.]/, '') + 'Props';
		}

		const importMatch = name.match(/(\w+?)\/(\w+)\.(\w+)/i);
		if (importMatch) {
			const alias = name.replace(/[\/\.]/g, '_') + 'Props';
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

function defaultHocRenderer ({section, imports, typeRenderer = renderType}) {
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

exports.defaultHocRenderer = defaultHocRenderer;

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
		export class ${section.name} extends React.Component<${propsInterfaceName} & React.HTMLProps<HTMLElement>> {
			${
				renderer({section: funcs, export: false, instance: true})
					.filter(Boolean)
					.join('\n')
			}
		}
	`;
}

exports.defaultComponentRenderer = defaultComponentRenderer;

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

exports.defaultClassRenderer = defaultClassRenderer;

function defaultTypedefRenderer ({section, export: exp}) {
	let outputStr;

	if (section.type.name === 'Object') {
		outputStr = `${exp ? 'export ' : ''}interface ${section.name} {
			${section.properties.map(prop => renderParam(prop, renderType)).join(',')}
		}`;
	}
	else if (section.type.name === 'Function') {
		const params = section.params.map(prop => renderParam(prop, renderType)).join(', ');
		const ret = section.returns.length === 0 ? 'void' : renderType(section.returns[0]);
		outputStr = `${exp ? 'export ' : ''}interface ${section.name} { (${params}): ${ret}; }`;
	}

	return `${renderDescription(section)}${outputStr}`;
}

exports.defaultTypedefRenderer = defaultTypedefRenderer;

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

function getDefaultRenderers (overrides = {}) {
	return Object.assign({}, defaultRenderers, overrides);
}

exports.getDefaultRenderers = getDefaultRenderers;
