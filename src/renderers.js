/**
 * Rendering functions and the default set of renderers
 */
const {hasRequiredTag} = require('./utils');
const {renderType} = require('./types');

function defaultModuleRenderer ({section, parent, root, log, output}) {
	if (parent !== root) {
		log.warn(`Unexpected module ${section.name}`);
		return;
	}

	let outputStr =
`// Type definitions for ${section.name}

import * as React from "react";

`;

	const statics = section.members.statics;
	output(outputStr);
}

exports.defaultModuleRenderer = defaultModuleRenderer;

function defaultFunctionRenderer ({section, typeRenderer = renderType, output}) {
	let outputStr = '',
		parameters = '',
		returns = 'void';

	parameters = section.params.map(({type}) => typeRenderer(type));

	if (section.returns.length) {
		returns = typeRenderer(section.returns[0].type);
	}

	outputStr += `export function ${section.name}(${parameters.join(', ')}): ${returns};\n\n`
	output(outputStr);
}

exports.defaultFunctionRenderer = defaultFunctionRenderer;

function defaultConstantRenderer ({section, log}) {
	log.info(section.name);
}

exports.defaultConstantRenderer = defaultConstantRenderer;

function defaultHocRenderer ({section, typeRenderer = renderType, output}) {
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
	output(outputStr);
}

exports.defaultHocRenderer = defaultHocRenderer;

function defaultClassRenderer ({section, output}) {
	let propDefn = '';
	output(`export ${propDefn}declare class ${section.name} extends React.Component<${section.name}Props, any> {};\n\n`);
}

exports.defaultClassRenderer = defaultClassRenderer;

const defaultRenderers = {
	'module': defaultModuleRenderer,
	'function': defaultFunctionRenderer,
	'constant': defaultConstantRenderer,
	'hoc': defaultHocRenderer
};

function getDefaultRenderers (overrides = {}) {
	return Object.assign({}, defaultRenderers, overrides);
}

exports.getDefaultRenderers = getDefaultRenderers;
