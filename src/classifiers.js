/**
 * Type classification functions
 *
 * @module classifiers
 */

const {hasHocTag} = require('./utils');

function defaultTypeClassifier ({section}) {
	const kind = section.kind;

	// Check for HOC
	if (kind === 'constant' && hasHocTag(section)) {
		return 'hoc';
	}

	return kind;
}
exports.defaultTypeClassifier = defaultTypeClassifier;
