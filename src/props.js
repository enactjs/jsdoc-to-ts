/**
 * Functions for working with props
 *
 * @module props
 */

const {hasRequiredTag} = require("./utils");
const {renderType} = require("./types");

function renderPropDefinitions(cls) {
	// If no props to render, return an empty string
	if (!cls.members || !cls.members.instance || !cls.members.instance.length) {
		return '';
	}
	let output = `export interface ${cls.name}Props {\n`;
	output = cls.members.instance.reduce((out, member) => {
		const required = hasRequiredTag(member) ? '' : '?';
		return out + `	${member.name}${required}: ${renderType(member.type)};\n`;
	}, output);
	return output + '}\n\n';
}
exports.renderPropDefinitions = renderPropDefinitions;
