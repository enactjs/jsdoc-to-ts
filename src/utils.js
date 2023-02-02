const jsonata = require('jsonata');

/**
 * Checks member for a 'required' tag
 *
 * @param {Object} member A property definition
 */
const hasRequiredTag = async (member) => {
	// Find any tag field whose `title` is 'required' (won't be there if not required)
	let result;
	await (async () => {
		const expression = "$[title='required']";
		result = await jsonata(expression).evaluate(member.tags);
	})()
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
	let result;
	await (async () => {
		const expression = "$[title='hoc']";
		result = await jsonata(expression).evaluate(member.tags);
	})()
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
	let result;
	await (async () => {
		const expression = "$[title='ui']";
		result = await jsonata(expression).evaluate(member.tags);
	})()
	return !!result;
};
exports.hasComponentTag = hasComponentTag;

const escapeClassMember = (member) => {
	return member.match(/-/) ? `'${member}'` : member;
};

exports.escapeClassMember = escapeClassMember;
