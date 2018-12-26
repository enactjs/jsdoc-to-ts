
/**
 * Rendering functions and the default set of renderers
 */
const {escapeClassMember, hasRequiredTag} = require('./utils');
const {renderType} = require('./types');
const {renderParam} = require('./params');

function isExports (tag) {
	return tag.title === 'exports';
}

function exportDeclare (fn) {
	return fn.includes('export') ? fn : `export declare ${fn}`;
}

function exportDeclarations (moduleName) {
	return function (tag) {
		if (tag.description === moduleName) {
			return `export default ${tag.description}`;	
		}

		return '';
	}
}

function defaultModuleRenderer ({section, parent, root, log, renderer, types}) {
	if (parent !== root) {
		log.warn(`Unexpected module ${section.name}`);
		return;
	}

	const moduleName = section.name.replace(/^.*\//g, '');

	const body = `
		${
			renderer({section: section.members.static})
				.filter(Boolean)
				.map(exportDeclare)
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

		${body.includes('React.') ? 'import * as React from "react";' : ''}
	`;

	return `${header}${body}`;
}

exports.defaultModuleRenderer = defaultModuleRenderer;

function defaultFunctionRenderer ({section, typeRenderer = renderType}) {
	let returns = 'void';

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

		return `${rest}${name}${optional}: ${typeRenderer(type)}`;
	});

	if (section.returns.length) {
		returns = typeRenderer(section.returns[0].type);
	}

	return `function ${section.name}(${parameters.join(', ')}): ${returns};`
}

exports.defaultFunctionRenderer = defaultFunctionRenderer;

function defaultConstantRenderer ({section, renderer}) {
	const declaration = `var ${section.name}:`;
	if (section.members.static.length === 0) {
		return `${declaration} ${renderType(section.type)};`;
	}

	return `${declaration} {
		${
			renderer({section: section.members.static})
				.filter(Boolean)
				.map(fn => fn.replace(/^function /, ''))
				.join('\n')
		}
	};`;
}

exports.defaultConstantRenderer = defaultConstantRenderer;

function renderInterface (name, members, interfaceBase, typeRenderer) {
	// use a type alias when there are no members
	if (members.length === 0) {
		return `export type ${name} = ${interfaceBase}`;
	}

	return `export interface ${name} ${interfaceBase ? `extends ${interfaceBase}` : ''} {
		${members.map(member => {
			const required = hasRequiredTag(member) ? '' : '?';
			return `${escapeClassMember(member.name)}${required}: ${typeRenderer(member.type)};`;
		}).join('\n')}
	}`;
}

function defaultHocRenderer ({section, typeRenderer = renderType}) {
	const props = section.members.instance.filter(member => !member.kind);
	const config = section.members.static.find(member => member.tags.find(tag => tag.title === 'hocconfig'));
	const hasProps = props && props.length > 0;
	const hasConfig = config && config.members.static.length > 0;

	const propsInterfaceName = `${section.name}Props`;
	const propsInterface = !hasProps ? '' : renderInterface(propsInterfaceName, props, 'Object', typeRenderer);

	const configInterfaceName = `${section.name}Config`;
	const configInterface = !hasConfig ? '' : renderInterface(configInterfaceName, config.members.static, 'Object', typeRenderer);

	const returnType = `React.ComponentType<P${hasProps ? `& ${propsInterfaceName}` : ''}>`;
	return `${configInterface}
		${propsInterface}
		export function ${section.name}<P>(
			${hasConfig ? `config: ${configInterfaceName},` : ''}
			Component: React.ComponentType<P>
		): ${returnType};
		${!hasConfig ? '' : `
			export function ${section.name}<P>(
				Component: React.ComponentType<P>
			): ${returnType};
		`}
	`;
}

exports.defaultHocRenderer = defaultHocRenderer;


function defaultComponentRenderer ({section, renderer, typeRenderer = renderType}) {
	const props = section.members.instance.filter(member => !member.kind);
	const funcs = section.members.instance.filter(member => member.kind === 'function');

	let propsBase = null;
	if (section.augments && section.augments.length > 0) {
		// only supports single extends ... 
		if (section.augments[0].name.indexOf(section.memberof) === 0) {
			// ... within the same submodule for now until we can resolve/import externals
			propsBase = section.augments[0].name.replace(/^.*[~\.]/, '') + 'Props';
		}
	}

	const propsInterfaceName = `${section.name}Props`;
	const propsInterface = renderInterface(propsInterfaceName, props, propsBase || 'Object', typeRenderer);

	return `${propsInterface}
		export class ${section.name} extends React.Component<${propsInterfaceName}> {
			${
				renderer({section: funcs})
					.filter(Boolean)
					.map(fn => fn.replace(/^function /, ''))
					.join('\n')
			}
		}
	`;
}

exports.defaultComponentRenderer = defaultComponentRenderer;

function defaultClassRenderer ({section, renderer}) {
	return `export declare class ${section.name} {
		${section.constructorComment ? (
			`constructor(${section.constructorComment.params.map(prop => renderParam(prop, renderType)).join(', ')});`
		) : ''}
		${
			renderer({section: section.members.instance})
				.filter(Boolean)
				.map(fn => fn.replace(/^function /, ''))
				.join('\n')
		}
	};\n`;
}

exports.defaultClassRenderer = defaultClassRenderer;

function defaultTypedefRenderer ({section}) {
	let outputStr;

	if (section.type.name === 'Object') {
		outputStr = `interface ${section.name} {
			${section.properties.map(prop => renderParam(prop, renderType)).join(',')}
		}`;
	}
	else if (section.type.name === 'Function') {
		const params = section.params.map(prop => renderParam(prop, renderType)).join(', ');
		const ret = section.returns.length === 0 ? 'void' : renderType(section.returns[0]);
		outputStr = `interface ${section.name} { (${params}): ${ret}; }`;
	}

	return outputStr;
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
