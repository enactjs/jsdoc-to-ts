const jsonata = require('jsonata');

/**
 * Checks member for a 'required' tag
 *
 * @param {Object} member A property definition
 */
const hasRequiredTag = async (member) => {
	// Find any tag field whose `title` is 'required' (won't be there if not required)
	const expression = "$[title='required']";
	const result = await jsonata(expression).evaluate(member.tags);
	return !!result;
};
exports.hasRequiredTag = hasRequiredTag;
/**
 * Checks member for a HOC tag
 *
 * @param {Object} member
 */
const hasHOCTag = async (member) => {
	// Find any tag field whose `title` is 'hoc' (won't be there if not required)
	const expression = "$[title='hoc']";
	const result = await jsonata(expression).evaluate(member.tags);
	return !!result;
};
exports.hasHOCTag = hasHOCTag;

/**
 * Checks member for a 'ui' tag
 *
 * @param {Object} member A property definition
 */
const hasComponentTag = async (member) => {
	// Find any tag field whose `title` is 'ui' (won't be there if not required)
	const expression = "$[title='ui']";
	const result = await jsonata(expression).evaluate(member.tags);
	return !!result;
};
exports.hasComponentTag = hasComponentTag;

const escapeClassMember = (member) => {
	return member.match(/-/) ? `'${member}'` : member;
};

exports.escapeClassMember = escapeClassMember;
