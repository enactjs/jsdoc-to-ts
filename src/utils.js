import jsonata from 'jsonata'//const jsonata = require('jsonata');

/**
 * Checks member for a 'required' tag
 *
 * @param {Object} member A property definition
 * @returns {Boolean}
 */
export const hasRequiredTag = (member) => {
	// Find any tag field whose `title` is 'required' (won't be there if not required)
	const expression = "$[title='required']";
	const result = jsonata(expression).evaluate(member.tags);
	return !!result;
};
// exports.hasRequiredTag = hasRequiredTag;
/**
 * Checks member for a HOC tag
 * @param {Object} member
 */
export const hasHOCTag = (member) => {
	// Find any tag field whose `title` is 'hoc'
	const expression = "$[title='hoc']";
	const result = jsonata(expression).evaluate(member.tags);
	return !!result;
};
// exports.hasHOCTag = hasHOCTag;

/**
 * Checks member for a 'ui' tag
 *
 * @param {Object} member A property definition
 * @returns {Boolean}
 */
export const hasComponentTag = (member) => {
	// Find any tag field whose `title` is 'required' (won't be there if not required)
	const expression = "$[title='ui']";
	const result = jsonata(expression).evaluate(member.tags);
	return !!result;
};
// exports.hasComponentTag = hasComponentTag;

export const escapeClassMember = (member) => {
	return member.match(/-/) ? `'${member}'` : member;
};

// exports.escapeClassMember = escapeClassMember;
