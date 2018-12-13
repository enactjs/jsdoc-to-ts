/**
 * Type classification functions
 *
 * @module classifiers
 */

const {hasComponentTag, hasHOCTag} = require('./utils');

function defaultTypeClassifier ({section}) {
	const kind = section.kind;

	// Check for HOC
	if (hasHOCTag(section)) {
		return 'hoc';
	}

	// Check for @ui
	if (hasComponentTag(section)) {
		return 'component';
	}

	return kind;
}
exports.defaultTypeClassifier = defaultTypeClassifier;
