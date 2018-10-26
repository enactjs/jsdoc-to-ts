const jsonata = require('jsonata');

/**
 * Checks member for a 'required' tag
 *
 * @param {Object} member A property definition
 * @returns {Boolean}
 */
const hasRequiredTag = (member) => {
	// Find any tag field whose `title` is 'required' (won't be there if not required)
	const expression = "$[title='required']";
	const result = jsonata(expression).evaluate(member.tags);
	return !!result;
};
exports.hasRequiredTag = hasRequiredTag;
/**
 * Checks member for a HOC tag
 * @param {Object} member
 */
const hasHOCTag = (member) => {
	// Find any tag field whose `title` is 'hoc'
	const expression = "$[title='hoc']";
	const result = jsonata(expression).evaluate(member.tags);
	return !!result;
};
exports.hasHOCTag = hasHOCTag;
