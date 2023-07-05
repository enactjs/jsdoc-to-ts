import jsonata from 'jsonata';

/**
 * Checks member for a 'required' tag
 *
 * @param {Object} member A property definition
 * @returns {Boolean}
 */
export const hasRequiredTag = async (member) => {
	// Find any tag field whose `title` is 'required' (won't be there if not required)
	const expression = "$[title='required']";
	const result = await jsonata(expression).evaluate(member.tags);
	return !!result;
};

/**
 * Checks member for a HOC tag
 *
 * @param {Object} member
 * @returns {Boolean}
 */
export const hasHOCTag = async (member) => {
	// Find any tag field whose `title` is 'hoc'
	const expression = "$[title='hoc']";
	const result = await jsonata(expression).evaluate(member.tags);
	return !!result;
};

/**
 * Checks member for a 'ui' tag
 *
 * @param {Object} member A property definition
 * @returns {Boolean}
 */
export const hasComponentTag = async (member) => {
	// Find any tag field whose `title` is 'ui' (won't be there if not required)
	const expression = "$[title='ui']";
	const result = await jsonata(expression).evaluate(member.tags);
	return !!result;
};

export const escapeClassMember = (member) => {
	return member.match(/-/) ? `'${member}'` : member;
};
