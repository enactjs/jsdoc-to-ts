/**
 * Rendering functions and the default set of renderers
 */
const {hasRequiredTag} = require('./utils');
const {renderType} = require('./types');
const {renderParam} = require('./params');

function isExports (tag) {
	return tag.title === 'exports';
}

function exportDeclare (fn) {
	return `export declare ${fn}`;
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

	let outputStr = `
		// Type definitions for ${section.name}

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

	return outputStr;
}

exports.defaultModuleRenderer = defaultModuleRenderer;

function defaultFunctionRenderer ({section, typeRenderer = renderType}) {
	let returns = 'void';

	const parameters = section.params.map(({name, type}) => {
		return `${type.type === 'RestType' ? '...' : ''}${name}: ${typeRenderer(type)}`;
	});

	if (section.returns.length) {
		returns = typeRenderer(section.returns[0].type);
	}

	return `function ${section.name}(${parameters.join(', ')}): ${returns};`
}

exports.defaultFunctionRenderer = defaultFunctionRenderer;

function defaultConstantRenderer ({section, log}) {
	log.info(section.name);
}

exports.defaultConstantRenderer = defaultConstantRenderer;

function defaultHocRenderer ({section, typeRenderer = renderType}) {
	let outputStr = '',
		configArgument = '',
		propCoercion = '',
		classPropCoercion = '<P>';

	// export an interface for the hoc config
	const hasConfig = section.members && section.members.static && section.members.static.length;
	if (hasConfig) {
		const config = section.members.static[0];

		configArgument = `config: ${section.name}Config, `;
		// We're ignoring the name set in the docs for a more descriptive name
		outputStr += `export interface ${section.name}Config {\n`;
		outputStr = config.members.static.reduce((out, member) => {
			const required = hasRequiredTag(member) ? '' : '?';

			return out + `	${member.name}${required}: ${typeRenderer(member.type)};\n`;
		}, outputStr);
		outputStr += '}\n\n';
	}

	// Export an interface for the hoc props
	const hasProps = section.members && section.members.instance && section.members.instance.length;
	if (hasProps) {
		propCoercion = `<P extends ${section.name}Props>`;
		classPropCoercion = `<P & ${section.name}Props>`;
		outputStr += `export interface ${section.name}Props {\n`;
		outputStr = section.members.instance.reduce((out, member) => {
			const required = hasRequiredTag(member) ? '' : '?';

			return out + `	${member.name}${required}: ${typeRenderer(member.type)};\n`;
		}, outputStr);
		outputStr += '}\n\n';
	}

	outputStr += `export function ${section.name}${propCoercion}(${configArgument}Component: React.ComponentType<P>): React.Component${classPropCoercion};\n\n`

	return outputStr;
}

exports.defaultHocRenderer = defaultHocRenderer;

function defaultClassRenderer ({section, renderer}) {
	return `export declare class ${section.name} {
		${section.constructorComment ? (
			`constructor(${section.constructorComment.params.map(prop => renderParam(prop, renderType)).join(', ')});`
		) : ''}
		${
			renderer({section: section.members.instance})
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

function defaultMemberRenderer ({section}) {
	return `var ${section.name}: ${renderType(section.type)};\n`;
}

exports.defaultMemberRenderer = defaultMemberRenderer;

const defaultRenderers = {
	'class': defaultClassRenderer,
	'module': defaultModuleRenderer,
	'function': defaultFunctionRenderer,
	'constant': defaultConstantRenderer,
	'hoc': defaultHocRenderer,
	'typedef': defaultTypedefRenderer,
	'member': defaultMemberRenderer
};

function getDefaultRenderers (overrides = {}) {
	return Object.assign({}, defaultRenderers, overrides);
}

exports.getDefaultRenderers = getDefaultRenderers;
