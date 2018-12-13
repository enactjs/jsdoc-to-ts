/**
 * Functions for working with types
 * TODO: Convert to new format and make a generator
 *
 * @module types
 */

/**
 * A mapping of jsdoc type fields to TypeScript types
 */
const typeMappings = {
	Boolean: 'boolean',
	Number: 'number',
	String: 'string',
	Object: 'object',
	RecordType: 'object'
};
/**
 * Converts a jsdoc NameExpression (from the type field) to text
 *
 * @param {Object} type
 * @returns {String} The type definition
 */
function renderNameExpression(type) {
	return typeMappings[type.name] || type.name.replace(/^.*[/\.~]/, '');
}

function renderTypeApplication(type) {
	if (type.expression.type === 'NameExpression') {
		switch (type.expression.name) {
			case 'Object':
				return `{[key: ${renderType(type.applications[0])}]: ${renderType(type.applications[1])}}`;
			case 'Array':
				return `${renderType(type.applications[0])}[]`;
		}
	}

	return 'any';
}

function renderUnionType(type) {
	return type.elements.map(el => renderType(el)).join(' | ');
}

function renderRestType(type) {
	return `${renderType(type.expression)}[]`;
}

function renderVoid () {
	return 'void';
}

function renderLiteral (type) {
	return type.value;
}

/**
 * Render various type strings
 */
const typeRenderers = {
	NameExpression: renderNameExpression,
	RestType: renderRestType,
	TypeApplication: renderTypeApplication,
	UndefinedLiteral: renderVoid,
	UnionType: renderUnionType,
	BooleanLiteralType: renderLiteral
};
function renderType(type) {
	if (!typeRenderers[type.type]) {
		return 'any';
	}
	return typeRenderers[type.type](type);
}
exports.renderType = renderType;
