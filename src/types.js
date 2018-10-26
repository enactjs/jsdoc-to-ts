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
	if (!typeMappings[type.name]) {
		return 'any';
	}
	return typeMappings[type.name];
}
/**
 * Render various type strings
 */
const typeRenderers = {
	NameExpression: renderNameExpression
};
function renderType(type) {
	if (!typeRenderers[type.type]) {
		return 'any';
	}
	return typeRenderers[type.type](type);
}
exports.renderType = renderType;
