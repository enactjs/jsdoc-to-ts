// generates the doc output for a node
function joinValues (node) {
	if (!node) return '';

	let v = node.children ? node.children.map(joinValues).join(' ') : node.value || '';

	switch (node.type) {
		case 'link':
			// TODO: Ignoring link contents for now because often they duplicate the linkReference.
			// Unfortunately, if there isn't a linkReference, the link is dropped altogether
			return '';
		case 'listItem':
			// Often, listItem will contain a paragraph node which will prepend a newline and * so
			// this strips that off if it exists
			return `* ${v.replace(/^\n *\*/, '')}`;
		case 'emphasis':
			return `_${v}_`;
		case 'inlineCode':
			return `\`${v}\``;
		case 'code':
			// Intentionally omitting leading * from inside code block so the VSCode will not
			// display them
			return '```\n' + v + '\n```\n';
		case 'paragraph':
			// add a trailing newline row for better spacing
			return '\n * ' + v + '\n *';
	}

	return v || '';
}

function renderDescription (section) {
	// trim off extra trailing newlines (often added by a final paragraph node)
	const desc = joinValues(section.description).replace(/\n \*$/g, '\n');
	return desc ? `/**${desc} */\n` : '';
}

module.exports = {
    renderDescription
};
